import * as React from 'react';
import fuzzysort from 'fuzzysort';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Type } from '../data/Type';
import { PokemonImage } from '../components/PokemonImage';
import { TypePill } from '../components/TypePill';
import { QueryParams } from '../src/QueryParams';

export default function Home() {
  const router = useRouter();

  const searchInputRef = React.useRef(null);
  const [search, set_search] = React.useState('');
  const [isWrap, set_isWrap] = React.useState(false);

  const [targets, set_targets] = React.useState(null);

  const [filterTypes, set_filterTypes] = React.useState(new Set([]));

  React.useEffect(() => {
    fetch('data/ArceusPokedexByNumber.json')
      .then((resp) => resp.json())
      .then((json) => {
        const targets = {};
        targets.all = Object.values(json);

        for (const pokemon of targets.all) {
          for (const form of pokemon.forms) {
            const [type_a, type_b] = form.types;
            if (type_a && !targets[type_a]) targets[type_a] = [];
            if (type_b && !targets[type_b]) targets[type_b] = [];

            const formPokemon = { ...pokemon, forms: [form] };
            type_a && targets[type_a].push(formPokemon);
            type_b && targets[type_b].push(formPokemon);
          }
        }

        set_targets(targets);
      });
  }, []);

  React.useEffect(() => {
    if (!router.isReady) return;

    const searchParam = router.query[QueryParams.Search];
    const typesParam = router.query[QueryParams.Types];

    if (typesParam) {
      set_filterTypes(new Set(Array.isArray(typesParam) ? typesParam : [typesParam]));
    }

    if (searchParam) {
      set_search(searchParam);
    }
  }, [router.isReady]);

  React.useEffect(() => {
    let query = {};

    if (filterTypes.size || search) {
      set_isWrap(false);

      if (filterTypes.size) {
        query[QueryParams.Types] = Array.from(filterTypes);
      }

      if (search) {
        query[QueryParams.Search] = search;
      }
    } else {
      set_isWrap(true);
    }

    router.replace({ query });
  }, [filterTypes, search]);

  function handleSearch(event) {
    set_search(event.target.value);
  }

  const [filterType_a, filterType_b] = Array.from(filterTypes);
  const hasTypeFilters = filterTypes.size > 0;
  let results = [];

  if (targets) {
    let searchTargets = [];

    if (!hasTypeFilters) {
      searchTargets = targets.all;
    } else {
      // no search input, show all that match all types in filterTypes

      if (filterType_a) {
        for (const pokemon of targets[filterType_a]) {
          for (const form of pokemon.forms) {
            if (filterType_b) {
              if (~form.types.indexOf(filterType_a) && ~form.types.indexOf(filterType_b)) {
                searchTargets.push(pokemon);
              }
            } else {
              searchTargets.push(pokemon);
            }
          }
        }
      }
    }

    if (search) {
      const keys = ['name'];
      const options = { keys, allowTypo: true };
      const searchResults = fuzzysort.go(search, searchTargets, options);
      results = searchResults.map((searchResult) => {
        const pokemon = searchResult.obj;
        const [result] = searchResult;
        // build search highlight html
        const highlight = fuzzysort.highlight(result, '<span class="result-highlight">', '</span>');
        return { pokemon, highlight };
      });
    } else if (hasTypeFilters) {
      results = searchTargets.map((pokemon) => {
        return { pokemon };
      });
    }
  }

  const isSearch = hasTypeFilters || search;
  // const isSearch = false;

  const typesInResults = {};
  for (const result of results) {
    const [pokemonForm] = result.pokemon.forms;
    pokemonForm.types.forEach((t) => {
      typesInResults[t] = true;
    });
  }

  function handleFocus(event) {
    event.target.setSelectionRange(0, event.target.value.length);
  }

  // client side: wait for router before rendering
  if (typeof window !== 'undefined' && !router.isReady) return null;

  return (
    <Container>
      <AboveResults>
        <SearchInput
          ref={searchInputRef}
          onFocus={handleFocus}
          placeholder="pikachu"
          value={search}
          onChange={handleSearch}
        />

        <TypeButtons $isWrap={isWrap}>
          {Array.from(new Set([...Array.from(filterTypes), ...Object.values(Type)])).map((type) => {
            // only show types that are in result set
            if (results.length && !typesInResults[type]) return null;

            function handleClick() {
              set_filterTypes((_) => {
                let set = new Set(Array.from(_));
                set.has(type) ? set.delete(type) : set.add(type);
                if (set.size > 2) {
                  set = new Set(Array.from(set).slice(set.size - 2, set.size));
                }
                return set;
              });
            }

            const disabled = hasTypeFilters && !filterTypes.has(type);

            return (
              <motion.div key={type} layout layoutTransition={spring}>
                <TypePill type={type} $disabled={disabled} onClick={handleClick} />
              </motion.div>
            );
          })}
        </TypeButtons>
      </AboveResults>

      <ResultsContainer>
        {!isSearch ? null : (
          <ResultCountContainer key={Date.now()}>
            <b>{String(results.length)}</b> pokémon found.
          </ResultCountContainer>
        )}
        <Results>
          {results.map((result) => {
            return (
              <ResultPokemon
                key={pokemonKey(result.pokemon)}
                pokemon={result.pokemon}
                highlight={result.highlight}
                type={filterType_a}
              />
            );
          })}
        </Results>
      </ResultsContainer>
    </Container>
  );
}

const spring = {
  type: 'spring',
  damping: 20,
  stiffness: 300,
};

const pokemonKey = (pokemon) => `${pokemon.num}-${pokemon.forms[0].name}`;

function ResultPokemon(props) {
  const pokemon = props.pokemon;
  const [firstForm] = pokemon.forms;

  let link = `/pokemon/${pokemon.num}`;

  if (firstForm.name) {
    const params = new URLSearchParams();
    params.set(QueryParams.Form, firstForm.name);
    link += `?${params.toString()}`;
  }

  return (
    <ResultPokemonContainer>
      <Link href={link}>
        <a>
          <ResultImage>
            <PokemonImage form={firstForm} pokemon={pokemon} type="icon" />
          </ResultImage>

          <ResultPokemonName type={props.type}>
            <span dangerouslySetInnerHTML={{ __html: props.highlight || pokemon.name }} />
            {!firstForm.name ? null : <span>{` (${firstForm.name})`}</span>}
          </ResultPokemonName>
        </a>
      </Link>
    </ResultPokemonContainer>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  padding: var(--spacer-2);
`;

const AboveResults = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SearchInput = styled.input`
  border: 1px solid rgba(var(--font-color), 0.8);
  padding: var(--spacer) var(--spacer-2);
  border-radius: var(--spacer);
  font-size: 24px;
  color: var(--font-color);
  background-color: var(--background-color);
`;

const ResultPokemonContainer = styled.div`
  margin: var(--spacer-2) var(--spacer-2) 0 0;
  border: 1px solid rgba(var(--font-color), 0.2);
  border-radius: var(--spacer);

  a {
    display: flex;
    width: 100%;
    height: 100%;

    padding: var(--spacer) var(--spacer);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
`;

const ResultPokemonName = styled.div`
  margin: 0 0 0 var(--spacer);
  font-size: 18px;
  font-weight: 200;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  .result-highlight {
    font-weight: 800;
    color: rgba(var(--${(props) => props.type || 'main-color'}), 1);
  }
`;

const ResultImage = styled.div`
  width: 32px;
  height: 32px;
`;

const ResultCountContainer = styled.div`
  font-size: 24px;
  font-weight: 200;
  padding: var(--spacer-2) 0 0 0;
`;

const ResultsContainer = styled.div`
  flex: 1;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: var(--spacer);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: var(--spacer-d2);
    background-color: rgba(var(--font-color), 0.6);
  }
`;

const Results = styled.div`
  overflow-y: scroll;
  flex-direction: column;
`;

const TypeButtons = styled.div`
  overflow-x: scroll;
  display: flex;
  flex-direction: row;
  flex-wrap: ${(props) => (props.$isWrap ? 'wrap' : 'no-wrap')};
  align-items: center;
  justify-content: ${(props) => (props.$isWrap ? 'center' : 'flex-start')};
  gap: var(--spacer);
  padding: var(--spacer-2) 0;
`;
