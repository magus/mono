import * as React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { HomeIcon } from '../HomeIcon';
import { Section } from '../Section';
import { PokemonForm } from '../PokemonForm';
import { PokemonMoves } from '../PokemonMoves';
import { PokemonSizes } from '../PokemonSizes';
import { QueryParams } from '../../src/QueryParams';

export function PokemonDetail(props) {
  const router = useRouter();

  const pokemon = props.pokedex[props.num];
  const [initFormName] = props.form;
  const [formIndex, set_formIndex] = React.useState(findFormIndex(pokemon, initFormName));
  const form = pokemon.forms[formIndex];

  React.useEffect(() => {
    let query = { [QueryParams.Num]: props.num };

    if (form.name) {
      query[QueryParams.Form] = form.name;
    }

    router.replace({ query });
  }, [form.name, props.num]);

  return (
    <Container>
      <HomeIcon />

      <PokemonForm form={form} pokemon={pokemon} handleSelectForm={set_formIndex} />

      <Section name="Sizes">
        <PokemonSizes sizes={pokemon.sizes} />
      </Section>

      <Section name="Moves" open>
        <PokemonMoves moves={form.moves} />
      </Section>
    </Container>
  );
}

function findFormIndex(pokemon, name) {
  for (let i = 0; i < pokemon.forms.length; i++) {
    const form = pokemon.forms[i];
    if (form.name === name) {
      return i;
    }
  }

  return 0;
}

const Container = styled.div`
  padding: var(--spacer-2);
`;
