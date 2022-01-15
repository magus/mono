import { ThemeProvider } from '@magusn/react/src/styles';
import { MagicAuthProvider } from '@magusn/react';

import { GlobalStyle } from './GlobalStyle';

const theme = {
  colors: {
    primary: 'rgb(249, 109, 16)',
    secondary: 'rgb(35, 181, 211)',
  },
};

export default function Providers(props) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <MagicAuthProvider>{props.children}</MagicAuthProvider>
      </ThemeProvider>
    </>
  );
}
