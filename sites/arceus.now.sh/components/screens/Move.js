import * as React from 'react';
import styled from 'styled-components';
import { HomeIcon } from '../HomeIcon';
import { ResultPokemon } from '../ResultPokemon';
import { Category } from '../Category';
import { TypePill } from '../TypePill';

export function Move(props) {
  // console.debug('[Move]', props);

  return (
    <Container>
      <HomeIcon />

      <div className="move-meta">
        <table>
          <tbody>
            <tr className="name">
              <td colSpan="2">
                <h2>{props.move.name}</h2>
              </td>
            </tr>
            <tr className="type">
              <td colSpan="2">
                <TypePill type={props.move.type} />
              </td>
            </tr>
            <tr className="cat">
              <td>Category</td>
              <td>
                <div>
                  <Category type={props.move.class} />
                </div>
              </td>
            </tr>
            <tr className="pow">
              <td>Power</td>
              <td>{props.move.power}</td>
            </tr>
            <tr className="acc">
              <td>Accuracy</td>
              <td>{props.move.acc}</td>
            </tr>
            <tr className="pp">
              <td>PP</td>
              <td>{props.move.pp}</td>
            </tr>
            <tr className="effect">
              <td colSpan="2">{props.move.effect}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {props.pokemonList.map((pokemon) => {
        return <ResultPokemon key={pokemonKey(pokemon)} pokemon={pokemon} />;
      })}
    </Container>
  );
}

const pokemonKey = (pokemon) => `${pokemon.num}-${pokemon.form.name}`;

const Container = styled.div`
  padding: var(--spacer-2);

  .move-meta {
    display: flex;
  }

  td {
    padding: 0 var(--spacer-2) var(--spacer-d2) 0;
  }

  .cat {
    td:nth-child(2) div {
      width: 20px;
    }
  }

  .cat,
  .pow,
  .acc,
  .pp {
    td:nth-child(1) {
      font-style: italic;
      font-variant: small-caps;
    }
    td:nth-child(2) {
      font-variant-numeric: tabular-nums;
    }
  }
`;
