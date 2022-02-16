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
  max-width: 100%;
  border-spacing: 0px;
  font-size: 16px;

  th {
    font-weight: 200;
    font-size: 14px;
  }
`;

const MoveTableContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
`;

const justifyCenter = css`
  justify-content: center;
`;
const justifyEnd = css`
  justify-content: flex-end;
`;

const TDContent = styled.td`
  height: 32px;
  white-space: nowrap;
  font-style: ${(props) => (props.italic ? 'italic' : 'normal')};
  font-weight: ${(props) => (props.bold ? '600' : 'normal')};
  font-variant-numeric: ${(props) => (props.tabularNums ? 'tabular-nums' : 'normal')};
  color: rgba(var(--gray), 1);

  .content {
    width: 100%;
    height: 100%;
    padding: 8px 0;
    margin: 0 var(--spacer) 0 0;
    display: flex;
    align-items: center;
    ${(props) => (props.center ? justifyCenter : '')}
    ${(props) => (props.right ? justifyEnd : '')}
  }
`;

function TD(props) {
  return (
    <TDContent {...props}>
      <div className="content">{props.children}</div>
    </TDContent>
  );
}

function TH(props) {
  return (
    <TDContent as="th" {...props}>
      <div className="content">{props.children}</div>
    </TDContent>
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
      <TH width="75px">Level</TH>
      <TH width="75px">Master</TH>
      <TH width="175px">Name</TH>
      <TH width="125px">Type</TH>
      <TH width="85px">Pow</TH>
      <TH width="50px">Acc</TH>
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
      <TD tabularNums>{!props.learn ? '—' : props.learn}</TD>
      <TD tabularNums>{!props.master ? '—' : props.master}</TD>
      <TD bold className="name">
        {move.name}
      </TD>
      <TD>
        <TypePill type={move.type} />
      </TD>
      <TD bold tabularNums>
        <MoveClass type={move.class} />
        <Spacer size="1" />
        {move.power || '—'}
      </TD>
      <TD tabularNums>{move.acc === null ? '—' : `${move.acc}%`}</TD>
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
