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

function initializeState() {
  return {
    search: '',
    filterTypes: new Set(),
    results: [],
    searchStatus: 'done',
    init: false,
  };
}

function addFilterType(state, type) {
  if (!Type[type]) return;

  let set = new Set(Array.from(state.filterTypes));
  set.has(type) ? set.delete(type) : set.add(type);
  if (set.size > 2) {
    set = new Set(Array.from(set).slice(set.size - 2, set.size));
  }
  state.filterTypes = set;
}

function setSearch(state, search) {
  state.search = search;
  state.searchStatus = 'pending';
}

function reducer(prevState, action) {
  const [type, data] = action;

  console.debug('[reducer]', type, data);

  const state = { ...prevState };

  switch (type) {
    case 'init': {
      if (data.query.search) {
        setSearch(state, data.query.search);
      }
      if (data.query.types) {
        const queryTypes = Array.isArray(data.query.types) ? data.query.types : [data.query.types];
        queryTypes.forEach((t) => addFilterType(state, t));
      }
      return state;
    }

    case 'search': {
      setSearch(state, data);
      return state;
    }

    case 'results': {
      state.init = true;
      state.searchStatus = 'done';
      state.results = data;
      return state;
    }

    case 'filter-type': {
      addFilterType(state, data);
      return state;
    }

    case 'clear': {
      const initState = initializeState();
      state.search = initState.search;
      state.filterTypes = initState.filterTypes;
      return state;
    }

    default:
      throw new Error(`[reducer] unexpeected action [${type}]`);
  }
}

export default function Home() {
  const router = useRouter();

  const [state, dispatch] = React.useReducer(reducer, null, initializeState);

  const searchInputRef = React.useRef(null);

  const [targets, set_targets] = React.useState(null);

  function handleSearch(event) {
    dispatch(['search', event.target.value]);
  }

  function handleFocus(event) {
    event.target.setSelectionRange(0, event.target.value.length);
  }

  function handleClear() {
    dispatch(['clear']);
  }

  const [filterType_a, filterType_b] = Array.from(state.filterTypes);
  const hasTypeFilters = state.filterTypes.size > 0;
  const isSearch = hasTypeFilters || state.search;

  console.debug('render', state);

  const typesInResults = {};
  state.results.forEach((result) => {
    const [pokemonForm] = result.pokemon.forms;
    pokemonForm.types.forEach((t) => {
      typesInResults[t] = true;
    });
  });

  React.useEffect(() => {
    fetch('data/ArceusPokedexByNumber.json')
      .then((resp) => resp.json())
      .then((json) => {
        const targets = {};
        targets.all = [];

        for (const pokemon of Object.values(json)) {
          for (const form of pokemon.forms) {
            const [type_a, type_b] = form.types;
            if (type_a && !targets[type_a]) targets[type_a] = [];
            if (type_b && !targets[type_b]) targets[type_b] = [];

            const formPokemon = { ...pokemon, forms: [form] };
            targets.all.push(formPokemon);
            type_a && targets[type_a].push(formPokemon);
            type_b && targets[type_b].push(formPokemon);
          }
        }

        console.debug('setting targets');
        set_targets(targets);
      });
  }, []);

  // initialize state from router/url/query
  React.useEffect(() => {
    if (!router.isReady) return;

    const query = {
      search: router.query[QueryParams.Search],
      types: router.query[QueryParams.Types],
    };

    dispatch(['init', { query }]);
  }, [router.isReady]);

  // synchronize state with router/url/query
  React.useEffect(() => {
    let query = {};

    if (state.filterTypes.size) {
      query[QueryParams.Types] = Array.from(state.filterTypes);
    }

    if (state.search) {
      query[QueryParams.Search] = state.search;
    }

    router.replace({ query });
  }, [state.filterTypes, state.search]);

  React.useEffect(() => {
    console.debug('handle search');

    let timeoutId;
    let asyncSearch = { cancel: () => {} };

    function submitResults(results) {
      timeoutId = setTimeout(() => dispatch(['results', results]), 100);
    }

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

      if (state.search) {
        const keys = ['name'];
        const options = { keys, allowTypo: true };

        asyncSearch = fuzzysort.goAsync(state.search, searchTargets, options);
        asyncSearch.then((searchResults) => {
          submitResults(
            searchResults.map((searchResult) => {
              const pokemon = searchResult.obj;
              const [result] = searchResult;
              // build search highlight html
              const highlight = fuzzysort.highlight(result, '<span class="result-highlight">', '</span>');
              return { pokemon, highlight };
            }),
          );
        });
      } else if (hasTypeFilters) {
        // delay results a bit to give render breathing room
        submitResults(
          searchTargets.map((pokemon) => {
            return { pokemon };
          }),
        );
      } else {
        submitResults([]);
      }
    }

    return function cleanup() {
      clearTimeout(timeoutId);
      asyncSearch.cancel();
    };
  }, [state.search, targets, hasTypeFilters, filterType_a, filterType_b]);

  // todo: client side wait for init and subsequent search before rendering
  // maybe possible to just program loading ui for searchStatus instead

  if (!state.init) return null;

  return (
    <Container>
      <AboveResults>
        <SearchInputContainer>
          <SearchInput
            ref={searchInputRef}
            onFocus={handleFocus}
            placeholder="pikachu"
            value={state.search}
            onChange={handleSearch}
          />
          {!isSearch ? null : (
            <button className="clear" onClick={handleClear}>
              ❌
            </button>
          )}
        </SearchInputContainer>

        <TypeButtons row={isSearch}>
          {Array.from(new Set([...Array.from(state.filterTypes), ...Object.values(Type)])).map((type) => {
            // when showing results, only show types that are in result set
            if (isSearch && !typesInResults[type]) return null;

            function handleClick() {
              dispatch(['filter-type', type]);
            }

            const disabled = hasTypeFilters && !state.filterTypes.has(type);

            return (
              <motion.div key={type} layout layoutTransition={spring}>
                <TypePill type={type} $disabled={disabled} onClick={handleClick} />
              </motion.div>
            );
          })}
        </TypeButtons>
      </AboveResults>

      {!isSearch ? null : (
        <ResultsContainer>
          {!isSearch ? null : (
            <ResultCountContainer>
              <b>{String(state.results.length)}</b> pokémon found.
            </ResultCountContainer>
          )}
          <Results>
            {state.results.map((result) => {
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
      )}
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

  const link = {
    pathname: '/pokemon/[num]/[[...form]]',
    query: { num: pokemon.num, form: [] },
  };

  if (firstForm.name) {
    link.query.form.push(firstForm.name);
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

const SearchInputContainer = styled.div`
  --clearButtonWidth: var(--spacer-6);

  width: 100%;
  display: flex;
  align-items: center;
  position: relative;

  .clear {
    position: absolute;
    right: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--clearButtonWidth);
  }
`;

const SearchInput = styled.input`
  width: 100%;
  border: 1px solid rgba(var(--font-color), 0.8);
  padding: var(--spacer) var(--clearButtonWidth) var(--spacer) var(--spacer-2);
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
  flex-wrap: ${(props) => (props.row ? 'no-wrap' : 'wrap')};
  align-items: center;
  justify-content: ${(props) => (props.row ? 'flex-start' : 'center')};
  gap: var(--spacer);
  padding: var(--spacer-2) 0;
`;
