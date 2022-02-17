import * as React from 'react';
import fuzzysort from 'fuzzysort';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { Type } from '../../public/data/Type';
import { TypePill } from '../TypePill';
import { ResultPokemon } from '../ResultPokemon';
import { QueryParams } from '../../src/QueryParams';
import { import_PokemonByType } from '../../src/import_PokemonByType';

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

  // console.debug('[reducer]', type, data);

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

export function Search() {
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

  const typesInResults = {};
  state.results.forEach((result) => {
    result.pokemon.form.types.forEach((t) => {
      typesInResults[t] = true;
    });
  });

  React.useEffect(() => {
    async function getTargets() {
      set_targets(await import_PokemonByType());
    }

    getTargets();
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
            const form = pokemon.form;
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

  if (!state.init) return null;

  const filteredTypes = Array.from(new Set([...Array.from(state.filterTypes), ...Object.values(Type)])).filter(
    (type) => {
      // when showing results, only show types that are in result set
      return !(isSearch && !typesInResults[type]);
    },
  );

  let displayedTypes = filteredTypes;
  if (displayedTypes.length === 0) {
    // if we have no matching types to display but we have filterTypes enabled
    // then show the type pill so we can tap it to disable the filter
    if (state.filterTypes.size > 0) {
      displayedTypes = Array.from(state.filterTypes);
    }
  }

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
          <AnimatePresence>
            {displayedTypes.map((type) => {
              function handleClick() {
                dispatch(['filter-type', type]);
              }

              const disabled = hasTypeFilters && !state.filterTypes.has(type);

              return (
                <motion.div
                  key={type}
                  layout
                  layoutTransition={spring}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <TypePill type={type} $disabled={disabled} onClick={handleClick} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </TypeButtons>
      </AboveResults>

      <ResultsContainer>
        {!isSearch ? null : (
          <ResultCountContainer>
            <b>{String(state.results.length)}</b> Pokémon found.
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
    </Container>
  );
}

const spring = {
  type: 'spring',
  damping: 20,
  stiffness: 300,
};

const pokemonKey = (pokemon) => `${pokemon.num}-${pokemon.form.name}`;

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

  /* flex-wrap: ${(props) => (props.row ? 'no-wrap' : 'wrap')}; */
  flex-wrap: wrap;

  align-items: center;

  /* justify-content: ${(props) => (props.row ? 'flex-start' : 'center')}; */
  justify-content: center;

  gap: var(--spacer);
  padding: var(--spacer-2) 0;
`;
