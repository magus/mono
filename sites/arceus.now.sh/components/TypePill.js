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

const TypeColors = {
  Bug: '#83C300',
  Dark: '#5B5466',
  Electric: '#FBD100',
  Fairy: '#FB89EB',
  Fighting: '#E0306A',
  Fire: '#FF9741',
  Flying: '#89AAE3',
  Ghost: '#4C6AB2',
  Grass: '#38BF4B',
  Ground: '#E87236',
  Ice: '#4CD1C0',
  Normal: '#919AA2',
  Poison: '#B567CE',
  Psychic: '#FF6675',
  Rock: '#C8B686',
  Steel: '#5A8EA2',
  Water: '#3692DC',
  Dragon: '#006FC9',
};
const TypeColor = (props) => TypeColors[props.type];

const TypeContainer = styled.div`
  border: none;
  outline: none;
  max-width: 150px;
  border-radius: 4px;
  background-color: ${TypeColor};
  padding: 0 16px 0 0;
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
  padding: 0 0 0 4px;
  font-weight: 400;
  font-size: 21px;
  letter-spacing: -1px;
  line-height: 40px;
`;

const TypeSymbolContainer = styled.div`
  width: 40px;
  height: 40px;
`;
