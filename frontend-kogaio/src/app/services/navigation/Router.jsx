import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import { Flex } from '@kogaio/Responsive';
import { NotFound } from 'app/screens';
import { Days, AddDay } from '@days';
import { PublicRoute } from './components';

const AppRouter = () => (
  <Flex flexDirection="column" width={1}>
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/" component={Days} />
        <PublicRoute exact path="/add" component={AddDay} />
        <NotFound default />
      </Switch>
    </BrowserRouter>
  </Flex>
);

export default AppRouter;
