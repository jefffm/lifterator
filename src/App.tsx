import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'
import { Switch, Route, HashRouter, Redirect } from "react-router-dom"

import Program from './containers/Program'
import ElevateAppBar from './components/ElevateAppBar';
import SwipeableTemporaryDrawer from './components/Drawer';
import ConfigurationPanel from './containers/ConfigurationPanel'
import './App.css';
import Workout from './containers/Workout';


const App: React.FC = () => {
  return (
    <div className="App">
      <HashRouter>
        <CssBaseline />
        <ElevateAppBar title={"Program"} menuButton={SwipeableTemporaryDrawer}>
          <Switch>

            <Route path="/config" component={ConfigurationPanel} />
            <Route path="/program" component={Program} />
            <Route
              path="/workout/:workoutId"
              render={(props) => <Workout workoutId={props.match.params.workoutId} />}
            />

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