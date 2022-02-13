import styled, { css } from 'styled-components';
import MovesById from '../../../public/data/MovesById';
import { Category } from '../../../components/Category';
import { TypePill } from '../../../components/TypePill';
import { PokemonImage } from '../../../components/PokemonImage';
import React from 'react';

export function PokemonDetail(props) {
  const [formIndex, set_formIndex] = React.useState(0);

  const pokemon = props.pokedex[props.num];
  const form = pokemon.forms[formIndex];

  console.debug('[PokemonDetail]', { props, pokemon, form });

  return (
    <Container>
      <PokemonForm form={form} pokemon={pokemon} handleSelectForm={set_formIndex} />
    </Container>
  );
}

const Container = styled.div`
  padding: 32px;
`;

const Types = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--spacer);
`;

const AlternateForms = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--spacer-2) var(--spacer-3);
`;

const SelectFormButton = styled.button`
  outline: none;
  border: none;
  background: transparent;
  color: var(--font-color);
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function PokemonForm(props) {
  console.debug('[PokemonForm]', { props });

  const [type_a, type_b] = props.form.types;

  return (
    <div>
      <h1>{props.form.name ? `${props.pokemon.name} (${props.form.name})` : props.pokemon.name}</h1>
      <Types>
        <TypePill type={type_a} />
        <TypePill type={type_b} />
      </Types>

      <PokemonImage form={props.form} pokemon={props.pokemon} type="large" />

      {props.pokemon.forms.length === 1 ? null : (
        <>
          <AlternateForms>
            {props.pokemon.forms.map((form, i) => {
              const active = form.name === props.form.name;

              return (
                <SelectFormButton disabled={active} key={i} onClick={() => props.handleSelectForm(i)}>
                  <div style={{ width: 64 }}>
                    <PokemonImage form={form} pokemon={props.pokemon} type="small" />
                  </div>
                  <div>{form.name || props.pokemon.name}</div>
                </SelectFormButton>
              );
            })}
          </AlternateForms>
        </>
      )}

      <PokemonMoves moves={props.form.moves} />
    </div>
  );
}

const MovesContainer = styled.div`
  h2 {
    padding: 32px 0 0 0;
    font-size: 48px;
    font-weight: 800;
  }

  h3 {
    padding: 32px 0 0 0;
    font-size: 32px;
    font-weight: 800;
  }
`;

const MoveTable = styled.table`
  text-align: left;
  width: 100%;
  border-spacing: 0px;
  font-size: 18px;

  th {
    font-weight: 200;
    font-size: 16px;
  }

  td {
    height: 44px;
    width: 0.1%;
    white-space: nowrap;
  }
`;

const MoveTableContainer = styled.div`
  width: 100%;
  overflow: scroll;
`;

const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TDContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px 0;
  ${(props) => (props.center ? flexCenter : '')}
`;

function TD(props) {
  return (
    <td>
      <TDContent {...props}>{props.children}</TDContent>
    </td>
  );
}

function TH(props) {
  return (
    <th>
      <TDContent {...props}>{props.children}</TDContent>
    </th>
  );
}

function MoveGroupHeader(props) {
  return (
    <tr>
      <td colSpan="8">
        <h3>{props.children}</h3>
      </td>
    </tr>
  );
}

function PokemonMoves(props) {
  return (
    <MovesContainer>
      <h2>Moves</h2>
      <MoveTableContainer>
        <MoveTable>
          <thead>
            <MoveColumnNames />
          </thead>
          <tbody>
            {props.moves.learn.map((learnMoveSpec) => {
              const [moveId, learn, master] = learnMoveSpec;
              return <Move key={moveId} id={moveId} learn={learn} master={master} />;
            })}

            <MoveGroupHeader>Tutor</MoveGroupHeader>
            {props.moves.tutor.map((moveId) => {
              return <Move key={moveId} id={moveId} />;
            })}
          </tbody>
        </MoveTable>
      </MoveTableContainer>
    </MovesContainer>
  );
}

function MoveColumnNames() {
  return (
    <MoveContainer>
      <TH>Name</TH>
      <TH>Type</TH>
      <TH center>Category</TH>
      <TH center>Power</TH>
      <TH center>Accuracy</TH>
      {/* <TH>PP</TH> */}
      <TH center>Learn</TH>
      <TH center>Master</TH>
    </MoveContainer>
  );
}

const MoveContainer = styled.tr`
  padding: 8px;

  .name {
    font-size: 28px;
  }
`;

function Move(props) {
  const move = MovesById.Lookup[props.id];

  return (
    <MoveContainer key={props.id}>
      <TD className="name">{move.name}</TD>
      <TD>
        <TypePill type={move.type} />
      </TD>
      <TD center>
        <MoveClass type={move.class} />
      </TD>
      <TD center>{move.power}</TD>
      <TD center>{move.acc}</TD>
      {/* <TD>{move.pp}</TD> */}
      <TD center>{props.learn}</TD>
      <TD center>{props.master}</TD>
    </MoveContainer>
  );
}

const MoveClassContainer = styled.div`
  width: 32px;
  height: 32px;
`;
function MoveClass(props) {
  return (
    <MoveClassContainer>
      <Category {...props} />
    </MoveClassContainer>
  );
}
