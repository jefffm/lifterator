import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'
import { Switch, Route, HashRouter, Redirect } from "react-router-dom"

import Program from './containers/Program'
import ElevateAppBar from './components/ElevateAppBar';
import SwipeableTemporaryDrawer from './components/Drawer';
import ConfigurationPanel from './containers/ConfigurationPanel'
import './App.css';


const App: React.FC = () => {
  return (
    <div className="App">
      <HashRouter>
        <CssBaseline />
        <ElevateAppBar title={"Program"} menuButton={SwipeableTemporaryDrawer}>
          <Switch>

            <Route path="/config">
              <ConfigurationPanel />
            </Route>

            <Route path="/program">
              <Program />
            </Route>

            <Route path="/">
              <Redirect to="/program" />
            </Route>

          </Switch>
        </ElevateAppBar>
      </HashRouter>
    </div>
  );
}

export default App;