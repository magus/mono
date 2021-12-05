import * as React from 'react';

export function Button(props) {
  return <button style={{ lineHeight: '24px' }}>{props.children}</button>;
}
