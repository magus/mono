import * as React from 'react';
import fuzzysort from 'fuzzysort';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Type } from '../data/Type';
import { PokemonImage } from '../components/PokemonImage';
import { Spacer } from '../components/Spacer';
import { TypePill } from '../components/TypePill';
import { QueryParams } from '../src/QueryParams';

export default function Home() {
  const router = useRouter();

  const [search, set_search] = React.useState('');
  const [wrapTypes, set_wrapTypes] = React.useState(false);

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
      set_wrapTypes(false);

      if (filterTypes.size) {
        query[QueryParams.Types] = Array.from(filterTypes);
      }

      if (search) {
        query[QueryParams.Search] = search;
      }
    } else {
      set_wrapTypes(true);
    }

    router.replace({ query });
  }, [filterTypes, search]);

  function handleSearch(event) {
    set_search(event.target.value);
  }

  const hasTypeFilters = filterTypes.size > 0;
  let results = [];

  if (targets) {
    let searchTargets = [];

    if (!hasTypeFilters) {
      searchTargets = targets.all;
    } else {
      // no search input, show all that match all types in filterTypes
      const [filterType_a, filterType_b] = Array.from(filterTypes);
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
      results = searchResults.map((r) => r.obj);
    } else if (hasTypeFilters) {
      results = searchTargets;
    }
  }

  const isSearch = hasTypeFilters || search;
  // const isSearch = false;

  const typesInResults = {};
  for (const pokemon of results) {
    const [pokemonForm] = pokemon.forms;
    pokemonForm.types.forEach((t) => {
      typesInResults[t] = true;
    });
  }

  return (
    <Container>
      <AboveResults>
        <SearchInput placeholder="pikachu" value={search} onChange={handleSearch} />

        <Spacer size="2" />

        <TypeButtons wrap={wrapTypes}>
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

            return <TypePill key={type} type={type} $disabled={disabled} onClick={handleClick} />;
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
          {results.map((pokemon) => {
            return <ResultPokemon key={pokemonKey(pokemon)} pokemon={pokemon} />;
          })}
        </Results>
      </ResultsContainer>
    </Container>
  );
}

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

  let name = pokemon.name;
  if (firstForm.name) {
    name += ` (${firstForm.name})`;
  }

  return (
    <Link href={link}>
      <a>
        <ResultPokemonContainer>
          <PokemonImage form={firstForm} pokemon={pokemon} type="icon" />

          <ResultPokemonName>{name}</ResultPokemonName>
        </ResultPokemonContainer>
      </a>
    </Link>
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
  padding: var(--spacer) 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const ResultPokemonName = styled.div`
  margin: 0 0 0 var(--spacer);
  font-size: 18px;
  font-weight: 200;
`;

const ResultCountContainer = styled.div`
  font-size: 24px;
  font-weight: 200;
  padding: var(--spacer-2) 0;
`;

const ResultsContainer = styled.div`
  flex: 1;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: var(--spacer);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
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
  flex-wrap: ${(props) => (props.wrap ? 'wrap' : 'no-wrap')};
  align-items: center;
  gap: 16px;
`;
