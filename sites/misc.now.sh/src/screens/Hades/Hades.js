import * as React from 'react';
import { Spacer, Button } from '@magusn/react';
import styled from 'styled-components';

import * as eurydice from './eurydice.js';
import BOON_LIST from './data/boons.json';
import * as RARITY from './data/rarity';
import * as GODS from './data/gods';
import * as list from '../../modules/list';
import { boon_pom } from './boon_pom';

const BOON_MAP = list.to_map((b) => b.key, BOON_LIST);

export function Hades() {
  const input_ref = React.useRef(null);

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

          const base_value = boon_data.rarity[boon.rarity];
          const pom_value = boon_pom(boon_data, boon.level);
          const total_value = base_value + pom_value;

          return (
            <BoonSelect key={boon.key} god={boon_data.god}>
              <div>{boon_data.name}</div>

              <div className="end">
                <div className="value">
                  <b>{total_value}</b>
                  <span> </span>
                  <span className="value_parts">
                    ({base_value} + {pom_value})
                  </span>
                </div>

                <Spacer size="4" />

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

      <SearchInput placeholder="Divine Dash" onChange={handle_change} ref={input_ref} />

      <div>
        {boon_search_list.map((boon) => {
          function handle_click() {
            // clear input field
            if (input_ref.current) {
              input_ref.current.value = '';
              set_search('');
            }

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
              <BoonButton god={boon.god} onClick={handle_click}>
                {boon.name}
              </BoonButton>
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
  --main-color: ${(props) => {
    return god_rgb(props.god);
  }};

  --white: ${(props) => {
    return god_rgb(props.god, 1 / 8);
  }};
`;

const BoonSelect = styled.div`
  padding: var(--spacer-1) 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: rgb(${(props) => god_rgb(props.god)});

  .value {
  }
  .value_parts {
    font-size: var(--font-small);
    font-style: italic;
  }

  .end {
    display: flex;
    flex-direction: row;
    align-items: center;
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

function god_rgb(god, mult = 1) {
  const adjust = (rgb) => rgb.map((v) => v * mult).join(', ');

  switch (god) {
    case GODS.T.zeus:
      return adjust([243, 229, 102]);
    case GODS.T.demeter:
      return adjust([229, 236, 252]);
    case GODS.T.hermes:
      return adjust([229, 164, 105]);
    case GODS.T.aphrodite:
      return adjust([201, 117, 194]);
    case GODS.T.ares:
      return adjust([226, 55, 54]);
    case GODS.T.artemis:
      return adjust([139, 193, 80]);
    case GODS.T.dionysus:
      return adjust([160, 58, 203]);
    case GODS.T.poseidon:
      return adjust([80, 155, 207]);
    case GODS.T.athena:
      return adjust([185, 169, 104]);
    default:
      return adjust([55, 55, 55]);
  }
}
