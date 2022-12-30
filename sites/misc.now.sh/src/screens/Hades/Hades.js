import * as React from 'react';
import { Spacer, Button } from '@magusn/react';
import styled from 'styled-components';

import * as eurydice from './eurydice.js';
import BOON_LIST from './data/boons.json';
import * as RARITY from './data/rarity';
import * as list from '../../modules/list';

const BOON_MAP = list.to_map((b) => b.key, BOON_LIST);

export function Hades() {
  const [current_boon_map, set_current_boon_map] = React.useState(new Map());
  const [search, set_search] = React.useState('');

  function handle_change(event) {
    const search = event.target.value;
    set_search(search);
  }

  let boon_search_list = [];

  if (search) {
    boon_search_list = BOON_LIST.filter((b) => {
      if (current_boon_map.has(b.key)) {
        return false;
      }

      if (b.key.indexOf(search.toLowerCase()) === -1) {
        return false;
      }

      return true;
    });
  }

  const current_list = Array.from(current_boon_map.values());

  const ambrosia_delight = eurydice.ambrosia_delight(current_list);
  const pom_porridge = eurydice.pom_porridge(current_list);

  console.debug({ search, boon_search_list, current_boon_map, current_list, ambrosia_delight, pom_porridge });

  return (
    <React.Fragment>
      <Choice win={ambrosia_delight > pom_porridge}>
        Ambrosia Delight +{percent(round(ambrosia_delight, 3))} damage
      </Choice>
      <Choice win={ambrosia_delight < pom_porridge}>Pom Porridge +{percent(round(pom_porridge, 3))} damage</Choice>

      <Spacer vertical size="4" />

      <div>
        {current_list.map((boon) => {
          function handle_delete() {
            set_current_boon_map((m) => {
              const next_map = new Map(m);
              next_map.delete(boon.key);
              return next_map;
            });
          }

          function handle_level(event) {
            set_current_boon_map((m) => {
              const next_map = new Map(m);
              const next_boon = next_map.get(boon.key);
              next_boon.level = int(event.target.value);
              next_map.set(boon.key, next_boon);
              return next_map;
            });
          }

          function handle_rarity(event) {
            set_current_boon_map((m) => {
              const next_map = new Map(m);
              const next_boon = next_map.get(boon.key);
              next_boon.rarity = int(event.target.value);
              next_map.set(boon.key, next_boon);
              return next_map;
            });
          }

          const boon_data = BOON_MAP[boon.key];

          return (
            <BoonSelect key={boon.key}>
              <div>{boon_data.name}</div>

              <div className="end">
                <select value={boon.rarity} onChange={handle_rarity}>
                  {RARITY.LIST.map((r) => {
                    return (
                      <option key={r} value={RARITY.N[r]}>
                        {r}
                      </option>
                    );
                  })}
                </select>
                <Spacer size="4" />
                <LevelInputLabel>Lv.</LevelInputLabel>
                <LevelInput pattern="[0-9]*" value={boon.level} onChange={handle_level} type="number" />
                <Spacer size="4" />
                <button onClick={handle_delete}>❌</button>
              </div>
            </BoonSelect>
          );
        })}
      </div>

      <Spacer vertical size="4" />

      <SearchInput placeholder="Divine Dash" onChange={handle_change} />

      <div>
        {boon_search_list.map((boon) => {
          function handle_click() {
            set_current_boon_map((m) => {
              const next_map = new Map(m);
              next_map.set(boon.key, {
                key: boon.key,
                level: 1,
                rarity: RARITY.N.common,
              });
              return next_map;
            });
          }

          return (
            <div key={boon.key}>
              <BoonButton onClick={handle_click}>{boon.name}</BoonButton>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}

const SearchInput = styled.input`
  cursor: text;
  width: 100%;
`;

const LevelInputLabel = styled.div`
  align-self: flex-end;
`;

const LevelInput = styled.input`
  width: var(--spacer-8);
`;

const BoonButton = styled(Button)`
  --main-color: 55, 55, 55;
`;

const BoonSelect = styled.div`
  padding: var(--spacer-1) 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .end {
    display: flex;
    flex-direction: row;
  }
`;

const Choice = styled.div`
  font-weight: ${(props) => (props.win ? '700' : '200')};
`;

const int = (value) => parseInt(value, 10);

function round(value, decimals) {
  const mult = Math.pow(10, decimals);
  const expand = Math.round(value * mult);
  const result = expand / mult;
  // console.debug({ value, decimals, mult, expand, result });
  return result;
}

const percent = (value) => `${round(value * 100, 1)}%`;
