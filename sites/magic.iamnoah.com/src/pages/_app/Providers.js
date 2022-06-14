import { MagicAuthProvider } from '@magusn/react/magic-auth';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from './GlobalStyle';

const theme = {
  colors: {
    primary: 'rgb(249, 109, 16)',
    secondary: 'rgb(35, 181, 211)',
  },
};

export default function Providers(props) {
  const { disableAuth } = props.Component;

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <MagicAuthProvider disabled={disableAuth}>{props.children}</MagicAuthProvider>
      </ThemeProvider>
    </>
  );
}
