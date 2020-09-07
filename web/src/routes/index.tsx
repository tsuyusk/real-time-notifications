import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Notifications from '../pages/Notifications';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/notifications/:user_id" component={Notifications} />
    </Switch>
  );
};

export default Routes;
