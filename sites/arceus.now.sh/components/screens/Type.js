import * as React from 'react';
import styled from 'styled-components';
import { ResultPokemon } from '../ResultPokemon';
import { HomeIcon } from '../HomeIcon';
import { Section } from '../Section';
import { PokemonMoves } from '../PokemonMoves';
import { TypePill } from '../TypePill';

export function Type(props) {
  // console.debug('[Type]', props);

  return (
    <Container>
      <HomeIcon />

      <div className="type-header">
        <TypePill type={props.type} />
      </div>

      <Section name={`Moves (${props.moveList.length})`}>
        <PokemonMoves moves={props.moveList} withoutLevels />
      </Section>

      <Section name={`Pokemon (${props.pokemonList.length})`} open>
        {props.pokemonList.map((pokemon) => {
          return <ResultPokemon key={pokemonKey(pokemon)} pokemon={pokemon} />;
        })}
      </Section>
    </Container>
  );
}

const pokemonKey = (pokemon) => `${pokemon.num}-${pokemon.form.name}`;

const Container = styled.div`
  padding: var(--spacer-2);

  .type-header {
    padding: var(--spacer-2) 0;
    display: flex;
    justify-content: center;
  }
`;
