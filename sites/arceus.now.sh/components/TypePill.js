import styled from 'styled-components';
import { TypeSymbol } from './TypeSymbol';

export function TypePill(props) {
  if (!props.type) {
    return null;
  }

  const as = props.onClick ? 'button' : undefined;

  return (
    <TypeContainer as={as} {...props}>
      <TypeSymbolContainer>
        <TypeSymbol type={props.type} />
      </TypeSymbolContainer>
      <TypeName>{props.type.toUpperCase()}</TypeName>
    </TypeContainer>
  );
}

const TypeColor = (props) => `var(--${props.type})`;

const TypeContainer = styled.div`
  border: none;
  outline: none;
  width: 100px;
  border-radius: var(--spacer-d2);
  background-color: rgba(${TypeColor}, 1);
  padding: 0 var(--spacer-2) 0 0;
  color: #fefefe;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  opacity: ${(props) => (props.$disabled ? 0.4 : 1)};
`;

const TypeName = styled.div`
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
  margin: 0 var(--spacer-d2) 0 0;
  width: 24px !important;
  height: 24px !important;
`;
