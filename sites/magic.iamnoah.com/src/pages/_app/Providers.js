import { MagicAuthProvider } from '@magusn/react/magic-auth';
import { ThemeProvider } from '@magusn/react/styles';

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
