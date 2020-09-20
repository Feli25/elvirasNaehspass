import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import NewHome from './AppNew'
import OldHome from './AppOld'

export default class App extends Component {

  render() {
    return (
      <div className="App">

        <Switch>
          <Route path="/new" component={NewHome} />
          <Route path="/" component={OldHome} />
        </Switch>
      
      </div>
    );
  }
}

