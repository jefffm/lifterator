import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import Program from './containers/Program'
import ElevateAppBar from './components/ElevateAppBar';
import SwipeableTemporaryDrawer from './components/Drawer';
import ConfigurationPanel from './containers/ConfigurationPanel'
import './App.css';

const views = {
  "Program": <Program />,
  "Configuration": <ConfigurationPanel />

}

const App: React.FC = () => {
  const element = views["Program"]
  return (
    <div className="App">
      <CssBaseline />
      <ElevateAppBar title={"Program"} menuButton={SwipeableTemporaryDrawer}>
        <Container>
          {views["Configuration"]}
          {views["Program"]}
        </Container>
      </ElevateAppBar>
    </div>
  );
}

export default App;