import styled from 'styled-components';

const SpacerSize = (props) => (props.size || 1) * 8;

export const Spacer = styled.div`
  width: ${SpacerSize}px;
  height: ${SpacerSize}px;
`;
