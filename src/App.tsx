import React from 'react';
import './App.css';
import { Program } from './lib/Program';
import CssBaseline from '@material-ui/core/CssBaseline';

const App: React.FC = () => {
  return (
    <div className="App">
      <CssBaseline />
      <Program name="531 Beginner Prep School" />
    </div>
  );
}

export default App;
