import { createGlobalStyle } from 'styled-components';
import { themeGet } from '@kogaio';

export const GlobalStyle = createGlobalStyle`
  html {
    //font-size: 62.5%;
  }
  body {
    margin: ${themeGet('space.0')}px;
    padding: ${themeGet('space.0')}px;
    font-family: ${themeGet('fonts.primary')};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  #root, #root > div {
    display: flex;
    justify-content: center;
    flex-direction: row;
    min-height: 100vh;
    width: 100%;
  }
  *, *::before, *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`;
