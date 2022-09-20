import React from 'react';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <h1>StarWars</h1>
      <Table />
    </PlanetsProvider>
  );
}

export default App;
