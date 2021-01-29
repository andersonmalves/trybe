import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Login } from '../pages/index';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/bebidas" component={ Home } />
      <Route exact path="/comidas" component={ Home } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
