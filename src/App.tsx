import React from 'react';
import './App.css';
import Program from './containers/Program'
import CssBaseline from '@material-ui/core/CssBaseline'
import ElevateAppBar from './components/ElevateAppBar';
import SwipeableTemporaryDrawer from './components/Drawer';

const App: React.FC = () => {
  return (
    <div className="App">
      <CssBaseline />
      <ElevateAppBar title={"Program"} menuButton={SwipeableTemporaryDrawer}>
        <Program />
      </ElevateAppBar>
    </div>
  );
}

export default App;