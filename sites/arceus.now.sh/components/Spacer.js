import styled from 'styled-components';

const SpacerSize = (props) => `var(--spacer-${props.size || 1})`;

export const Spacer = styled.div`
  width: ${SpacerSize};
  height: ${SpacerSize};
`;
