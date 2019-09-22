import React from 'react';
import './App.css';
import { Phase } from './Phase';

const App: React.FC = () => {
  return (
    <div className="App">
      <Phase number={1} />
      <Phase number={2} />
      <Phase number={3} />
    </div>
  );
}

export default App;
