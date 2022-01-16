import * as React from 'react';
import styled from 'styled-components';

export function Spacer(props) {
  if (props.horizontal) {
    return <HorizontalSpacer {...props} />;
  } else if (props.vertical) {
    return <VerticalSpacer {...props} />;
  }

  return <SquareSpacer {...props} />;
}

const sizeProps = (props) => `var(--spacer-${props.size || 1})`;
const pxProps = (props) => `${props.px}px`;
const spacerVar = (props) => (props.px ? pxProps(props) : sizeProps(props));

const VerticalSpacer = styled.div`
  height: ${spacerVar};
`;

const HorizontalSpacer = styled.div`
  width: ${spacerVar};
`;

const SquareSpacer = styled.div`
  width: ${spacerVar};
  height: ${spacerVar};
`;
