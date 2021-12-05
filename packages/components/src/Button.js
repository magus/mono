import * as React from 'react';

let hi = 'blah';

export function Button(props) {
  return <button style={{ lineHeight: '24px' }}>{props.children}</button>;
}
