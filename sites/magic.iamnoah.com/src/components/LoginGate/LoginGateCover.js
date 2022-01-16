import * as React from 'react';
import styled, { keyframes } from 'styled-components';

import Page from 'src/components/Page';

export default function LoginGateCover({ onAnimationEnd }) {
  function handleAnimationEnd() {
    console.debug('[LoginGateCover]', 'handleAnimationEnd');
    if (typeof onAnimationEnd === 'function') {
      onAnimationEnd();
    }
  }

  return (
    <LoginGateContainer>
      <Page forceWindowHeight>
        <AnimatedWandContainer onAnimationEnd={handleAnimationEnd}>
          <AnimatedWandBackground />
          <AnimatedWand />
        </AnimatedWandContainer>

        {/* <div>
        {new Array(500).fill(1).map((_, i) => {
          return (
            <div key={i} style={{ height: 100 }}>
              {i}
            </div>
          );
        })}
      </div> */}
      </Page>
    </LoginGateContainer>
  );
}

const LoginGateContainer = styled.div`
  background-color: rgba(var(--background-color), 1);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const AnimatedWandContainer = styled.div`
  position: relative;
  --animation-width: 256;
  --animation-height: 256;
  /* 19 frames but subtract 1 for number of steps (end on last frame so do not step over it) */
  --animation-steps: 18;
  --animation-delay: 100ms;
  --animation-timing: calc(var(--animation-steps) * var(--animation-delay));
`;

const AnimatedWandBackground = styled.div`
  width: calc(var(--animation-width) * 1px);
  height: calc(var(--animation-height) * 1px);
  background-image: url(/wand-background.png);
`;

const animateWand = keyframes`
  from { background-position-x:     0px; }
  /* 3840 = 256 * 15 (16 frames but end on last frame) */
  to   { background-position-x: calc(-1 * (var(--animation-width) * 1px) * var(--animation-steps)); }
`;

const AnimatedWand = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(var(--animation-width) * 1px);
  height: calc(var(--animation-height) * 1px);
  background-image: url(/wand-spritesheet.png);

  animation: ${animateWand} var(--animation-timing) steps(var(--animation-steps)) forwards;
  animation-fill-mode: forwards;
`;
