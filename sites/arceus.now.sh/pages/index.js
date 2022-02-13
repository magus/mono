import * as React from 'react';
import fuzzysort from 'fuzzysort';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Types } from '../data/Types';

const QueryParams = {
  Search: 'q',
};

function TypeButton(props) {
  return <TypeButton_button {...props}>{props.type.toUpperCase()}</TypeButton_button>;
}

const TypeButton_button = styled.button`
  opacity: ${(props) => (props.$disabled ? 0.4 : 1)};
`;

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
    } else {
      results = searchTargets;
    }
  }

  return (
    <div>
      <input value={search} onChange={handleSearch} />

      {Object.values(Types).map((type) => {
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

        return <TypeButton key={type} type={type} $disabled={disabled} onClick={handleClick}></TypeButton>;
      })}

      <Results>
        {results.map((pokemon) => {
          const link = `/pokemon/${pokemon.num}`;
          const [firstForm] = pokemon.forms;
          return (
            <div key={`${pokemon.num}-${firstForm.name}`}>
              <a href={link}>{pokemon.name}</a>
            </div>
          );
        })}
      </Results>
    </div>
  );
}

const Results = styled.div`
  flex-direction: column;
`;
