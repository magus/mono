import * as React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { TypeSymbol } from './TypeSymbol';

export function TypePill(props) {
  const { type } = props;

  if (!type) {
    return null;
  }

  const as = props.onClick ? 'button' : undefined;

  const content = (
    <TypeContainer as={as} {...props}>
      <TypeSymbolContainer>
        <TypeSymbol type={type} />
      </TypeSymbolContainer>
      {props.withoutLabel ? null : <TypeName>{type.toUpperCase()}</TypeName>}
    </TypeContainer>
  );

  if (props.link) {
    const link = {
      pathname: '/type/[type]',
      query: { type },
    };

    return (
      <Link href={link}>
        <a>{content}</a>
      </Link>
    );
  }

  return content;
}

const TypeColor = (props) => `var(--${props.type})`;
const WithoutLabel = (props) => {
  if (props.withoutLabel) {
    return '';
  }

  return css`
    width: 100px;
    padding: 0 var(--spacer-2) 0 0;
  `;
};
const TypeContainer = styled.div`
  ${WithoutLabel}

  border: none;
  outline: none;
  border-radius: var(--spacer-d2);
  background-color: rgba(${TypeColor}, 1);
  color: #fefefe;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  opacity: ${(props) => (props.$disabled ? 0.4 : 1)};
`;

const TypeName = styled.div`
  margin: 0 0 0 var(--spacer-d2);
  flex: 1;
  text-align: center;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: -1px;
  line-height: 24px;
  text-shadow: -1px 0px 4px rgba(0, 0, 0, 0.5);
`;

const TypeSymbolContainer = styled.div`
  /* border-right: 1px solid #fefefe; */
  flex-shrink: 0;
  width: 24px !important;
  height: 24px !important;
`;
