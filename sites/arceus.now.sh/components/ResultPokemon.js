import * as React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { PokemonImage } from './PokemonImage';
import { Spacer } from './Spacer';
import { TypePill } from './TypePill';

export function ResultPokemon(props) {
  const pokemon = props.pokemon;

  const link = {
    pathname: '/pokemon/[num]/[[...form]]',
    query: { num: pokemon.num, form: [] },
  };

  if (pokemon.form.name) {
    link.query.form.push(pokemon.form.name);
  }

  const [typeA, typeB] = pokemon.form.types;

  return (
    <ResultPokemonContainer>
      <Link href={link}>
        <a>
          <div className="content">
            <div className="image-name">
              <ResultImage>
                <PokemonImage form={pokemon.form} pokemon={pokemon} type="icon" />
              </ResultImage>

              <ResultPokemonName type={props.type}>
                <span dangerouslySetInnerHTML={{ __html: props.highlight || pokemon.name }} />
                {!pokemon.form.name ? null : <span>{` (${pokemon.form.name})`}</span>}
              </ResultPokemonName>
            </div>
            <div className="types">
              <TypePill type={typeA} withoutLabel />
              <Spacer size="1" />
              <TypePill type={typeB} withoutLabel />
            </div>
          </div>
        </a>
      </Link>
    </ResultPokemonContainer>
  );
}

const ResultPokemonContainer = styled.div`
  margin: var(--spacer-2) var(--spacer-2) 0 0;
  border: 1px solid rgba(var(--font-color), 0.2);
  border-radius: var(--spacer);

  .image-name,
  .types {
    display: flex;
    display: flex;
    flex-direction: row;
  }

  .content {
    display: flex;
    width: 100%;
    height: 100%;

    padding: var(--spacer) var(--spacer);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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
