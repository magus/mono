import { ThemeProvider } from 'styled-components';
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
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </>
  );
}
