import * as React from 'react';
import styled from 'styled-components';
import { TypePill } from './TypePill';
import { PokemonImage } from './PokemonImage';
import { Spacer } from './Spacer';

export function PokemonForm(props) {
  const [type_a, type_b] = props.form.types;

  return (
    <>
      <h1>{props.form.name ? `${props.pokemon.name} (${props.form.name})` : props.pokemon.name}</h1>
      <Types>
        <TypePill type={type_a} />
        <TypePill type={type_b} />
      </Types>

      <FormImage>
        <PokemonImage form={props.form} pokemon={props.pokemon} type="large" />
      </FormImage>

      {props.pokemon.forms.length === 1 ? null : (
        <>
          <AlternateForms>
            <div className="scroll">
              <div className="scroll-content">
                <div className="scroll-content-border">
                  {props.pokemon.forms.map((form, i) => {
                    const active = form.name === props.form.name;

                    return (
                      <SelectFormButton disabled={active} key={i} onClick={() => props.handleSelectForm(i)}>
                        <AlternateFormImage>
                          <PokemonImage form={form} pokemon={props.pokemon} type="small" />
                        </AlternateFormImage>
                        <div>{form.name || props.pokemon.name}</div>
                      </SelectFormButton>
                    );
                  })}
                </div>
                <Spacer size="2" />
              </div>
            </div>

            <div className="scroll-fadeLeft" />
            <div className="scroll-fadeRight" />
          </AlternateForms>
        </>
      )}
    </>
  );
}

const Types = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--spacer);
`;

const FormImage = styled.div`
  padding: var(--spacer) 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AlternateForms = styled.div`
  position: relative;
  margin: 0 0 0 calc(-1 * var(--spacer-2));
  display: flex;
  justify-content: center;

  .scroll {
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    display: flex;
  }

  .scroll-content {
    margin: 0 var(--spacer-2);
    display: flex;
    flex-direction: row;
  }

  .scroll-content-border {
    padding: var(--spacer) var(--spacer-2);
    border: 1px solid rgba(var(--font-color), 0.2);
    border-radius: var(--spacer);
    display: flex;
    flex-direction: row;
    gap: var(--spacer-2) var(--spacer-3);
  }

  .scroll-fadeLeft {
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(to left, rgba(var(--background-color), 0) 0%, rgba(var(--background-color), 1) 100%);
    width: var(--spacer-2);
    height: 100%;
  }

  .scroll-fadeRight {
    position: absolute;
    top: 0;
    right: 0;
    background: linear-gradient(to right, rgba(var(--background-color), 0) 0%, rgba(var(--background-color), 1) 100%);
    width: var(--spacer-2);
    height: 100%;
  }
`;

const SelectFormButton = styled.button`
  border: none;
  background: transparent;
  color: var(--font-color);
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AlternateFormImage = styled.div`
  width: 64px;
`;
