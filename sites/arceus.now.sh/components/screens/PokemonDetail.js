import * as React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { TypePill } from '../TypePill';
import { PokemonImage } from '../PokemonImage';
import { PokemonMoves } from '../PokemonMoves';
import { QueryParams } from '../../src/QueryParams';
import { Spacer } from '../Spacer';

export function PokemonDetail(props) {
  const router = useRouter();

  const pokemon = props.pokedex[props.num];

  const [formIndex, set_formIndex] = React.useState(0);
  const form = pokemon.forms[formIndex];

  React.useEffect(() => {
    if (!router.isReady) return;

    const formParam = router.query[QueryParams.Form];

    // default to first form
    if (!formParam) return 0;

    // ...find form matching formParam
    for (let i = 0; i < pokemon.forms.length; i++) {
      const form = pokemon.forms[i];
      if (form.name === formParam) {
        set_formIndex(i);
      }
    }
  }, [router.isReady, props.num]);

  React.useEffect(() => {
    let query = { [QueryParams.Num]: props.num };

    if (formIndex) {
      const form = pokemon.forms[formIndex];
      if (form.name) {
        query[QueryParams.Form] = form.name;
      }
    }

    router.replace({ query });
  }, [formIndex]);

  return (
    <Container>
      <PokemonForm form={form} pokemon={pokemon} handleSelectForm={set_formIndex} />
    </Container>
  );
}

const Container = styled.div`
  padding: var(--spacer-2);
`;

const Types = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--spacer);
`;

const AlternateForms = styled.div`
  position: relative;
  width: calc(100% + var(--spacer-2));
  margin: 0 0 0 calc(-1 * var(--spacer-2));

  .scroll {
    padding: 0 var(--spacer-2);
    overflow-x: scroll;
    display: flex;
  }

  .scroll-content {
    border: 1px solid rgba(var(--font-color), 0.2);
    border-radius: var(--spacer);
    padding: var(--spacer) var(--spacer-2);
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

function PokemonForm(props) {
  const [type_a, type_b] = props.form.types;

  return (
    <div>
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
            </div>

            <div className="scroll-fadeLeft" />
            <div className="scroll-fadeRight" />
          </AlternateForms>
        </>
      )}

      <Section name="Moves">
        <PokemonMoves moves={props.form.moves} />
      </Section>
    </div>
  );
}

const SectionContainer = styled.div`
  .content {
    overflow: hidden;
  }

  .header-toggle {
    border-top: 1px solid rgba(var(--font-color), 0.2);
    border-bottom: 1px solid rgba(var(--font-color), 0.2);
    width: 100%;
    text-align: left;
    margin: var(--spacer-2) 0 0 0;
    padding: var(--spacer) 0;
    font-size: 24px;
    font-weight: 800;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const OpenIcon = styled(motion.div)`
  font-size: 16px;
`;

function Section(props) {
  const [isOpen, set_isOpen] = React.useState(false);

  return (
    <SectionContainer>
      <button className="header-toggle" onClick={() => set_isOpen((o) => !o)}>
        <OpenIcon initial={{ rotate: -45 }} animate={{ rotate: isOpen ? 0 : -45 }}>
          &#9698;
        </OpenIcon>
        <Spacer size="2" />
        {props.name}
      </button>
      <div className="content">
        <AnimatePresence>
          {!isOpen ? null : (
            <motion.div
              // force line break
              initial={{ y: -300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -300, opacity: 0 }}
            >
              {props.children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionContainer>
  );
}

const FormImage = styled.div`
  padding: var(--spacer) 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
