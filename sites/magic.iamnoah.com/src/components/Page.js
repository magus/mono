import * as React from 'react';
import styled, { css } from 'styled-components';

import useWindowHeight from 'src/hooks/useWindowHeight';

export default function Page(props) {
  const { children, className, innerRef, forceWindowHeight } = props;

  const pageRef = React.useRef();

  // sync pageRef and innerRef
  React.useEffect(() => {
    if (innerRef) {
      innerRef.current = pageRef.current;
    }
  });

  const windowHeight = useWindowHeight();

  const style = {};

  if (forceWindowHeight) {
    style.height = windowHeight;
  }

  return (
    <Container className={className} ref={pageRef} style={style} {...props}>
      {children}
    </Container>
  );
}

const forceWindowHeight = (props) => {
  return !props.forceWindowHeight
    ? ''
    : css`
        position: absolute;
        height: 100%;
        width: 100%;
      `;
};

const Container = styled.div`
  padding: var(--spacer-3);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${forceWindowHeight}
`;
