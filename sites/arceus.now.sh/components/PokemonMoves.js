import * as React from 'react';
import styled, { css } from 'styled-components';
import MovesById from '../public/data/MovesById';
import { Category } from './Category';
import { TypePill } from './TypePill';
import { Spacer } from './Spacer';

export function PokemonMoves(props) {
  return (
    <MovesContainer>
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

const MovesContainer = styled.div`
  h3 {
    padding: var(--spacer-4) 0 0 0;
    font-size: 18px;
    font-weight: 800;
  }
`;

const MoveTable = styled.table`
  text-align: left;
  width: 100%;
  border-spacing: 0px;
  font-size: 16px;

  th {
    font-weight: 200;
    font-size: 16px;
  }

  td {
    height: 32px;
    width: 0.1%;
    white-space: nowrap;
  }
`;

const MoveTableContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
`;

const justifyCenter = css`
  justify-content: center;
`;

const TDContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px 0;
  margin: 0 var(--spacer) 0 0;
  display: flex;
  align-items: center;
  ${(props) => (props.center ? justifyCenter : '')}
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

function MoveColumnNames() {
  return (
    <MoveContainer>
      <TH>Level</TH>
      <TH>Master</TH>
      <TH>Name</TH>
      <TH>Type</TH>
      <TH center>Pow</TH>
      <TH center>Acc</TH>
      {/* <TH>PP</TH> */}
    </MoveContainer>
  );
}

const MoveContainer = styled.tr`
  padding: var(--spacer);
`;

function Move(props) {
  const move = MovesById.Lookup[props.id];

  return (
    <MoveContainer key={props.id}>
      <TD>{!props.learn ? '-' : props.learn}</TD>
      <TD>{!props.master ? '-' : props.master}</TD>
      <TD className="name">{move.name}</TD>
      <TD center>
        <MoveClass type={move.class} />
        <Spacer size="d2" />
        <TypePill type={move.type} />
      </TD>
      <TD center>{move.power}</TD>
      <TD center>{move.acc}</TD>
      {/* <TD>{move.pp}</TD> */}
    </MoveContainer>
  );
}

const MoveClassContainer = styled.div`
  width: 20px;
  height: 20px;
`;
function MoveClass(props) {
  return (
    <MoveClassContainer>
      <Category {...props} />
    </MoveClassContainer>
  );
}
