import React, { Fragment } from 'react';
import { themeFactory } from '@kogaio';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from 'assets/GlobalStyle';
import theme from 'assets/KogaioTheme';
import Router from './services/navigation/Router';

const Root = () => (
  <ThemeProvider theme={themeFactory(theme)}>
    <Fragment>
      <GlobalStyle />
      <Router />
    </Fragment>
  </ThemeProvider>
);

export default Root;
