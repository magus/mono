import * as React from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';

export function Button({ className, children, href, simple, ...restProps }) {
  if (simple) {
    return (
      <SimpleButton className={className} {...restProps}>
        {children}
      </SimpleButton>
    );
  } else if (href) {
    return (
      <Link href={href} {...restProps} {...restProps}>
        <StyledA className={className} disabled={restProps.disabled}>
          {children}
        </StyledA>
      </Link>
    );
  }

  return (
    <StyledButton className={className} {...restProps}>
      {children}
    </StyledButton>
  );
}

const sharedStyles = {};
sharedStyles.button = css`
  --button-height: var(--spacer-6);

  margin: var(--spacer-2) 0 0 0;
  padding: 0 var(--spacer);
  width: 100%;
  height: var(--button-height);
  line-height: var(--button-height);
  border-radius: var(--spacer);
  background-color: rgba(var(--main-color), 1);
  color: rgba(var(--white), 0.9);
  font-weight: 700;
  text-align: center;
  text-transform: capitalize;

  cursor: pointer;

  display: flex;
  justify-content: center;

  ${(props) =>
    props.disabled &&
    css`
      pointer-events: none;
      background-color: rgba(var(--gray), 1);
    `}
`;

const StyledButton = styled.button`
  ${sharedStyles.button}
`;

const StyledA = styled.a`
  ${sharedStyles.button}
  display: inline-block;
`;

const SimpleButton = styled.button`
  cursor: pointer;
`;
