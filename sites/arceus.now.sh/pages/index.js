import * as React from 'react';
import fuzzysort from 'fuzzysort';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Type } from '../data/Type';
import { PokemonImage } from '../components/PokemonImage';
import { Spacer } from '../components/Spacer';
import { TypePill } from '../components/TypePill';

const QueryParams = {
  Search: 'q',
};

export default function Home() {
  const router = useRouter();

  const isClient = typeof window !== 'undefined';
  const searchParam = isClient ? new URLSearchParams(window.location.search).get(QueryParams.Search) : '';
  const [search, set_search] = React.useState(searchParam || '');

  const [targets, set_targets] = React.useState(null);

  const [filterTypes, set_filterTypes] = React.useState(new Set([]));

  React.useEffect(() => {
    console.debug('fetch');
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
        console.debug({ targets });
      });
  }, []);

  function handleSearch(event) {
    const value = event.target.value;
    let query;

    if (value) {
      query = { [QueryParams.Search]: value };
    }

    router.replace({ query });
    set_search(value);
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

  return (
    <Container>
      <SearchInput value={search} onChange={handleSearch} />

      <Spacer size="2" />

      <TypeButtons>
        {Object.values(Type).map((type) => {
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

      <ResultsContainer>
        {!isSearch ? null : (
          <ResultCount>
            <b>{results.length}</b> pokémon found.
          </ResultCount>
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
  const link = `/pokemon/${pokemon.num}`;

  return (
    <Link href={link}>
      <a>
        <ResultPokemonContainer>
          <PokemonImage form={firstForm} pokemon={pokemon} type="icon" />

          <ResultPokemonName>{pokemon.name}</ResultPokemonName>
        </ResultPokemonContainer>
      </a>
    </Link>
  );
}

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  padding: var(--spacer-2);
`;

const ResultCount = styled.div`
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;
