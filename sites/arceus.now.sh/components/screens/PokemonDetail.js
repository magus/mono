import * as React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Section } from '../Section';
import { PokemonForm } from '../PokemonForm';
import { PokemonMoves } from '../PokemonMoves';
import { QueryParams } from '../../src/QueryParams';

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

      <Section name="Moves">
        <PokemonMoves moves={form.moves} />
      </Section>
    </Container>
  );
}

const Container = styled.div`
  padding: var(--spacer-2);
`;
