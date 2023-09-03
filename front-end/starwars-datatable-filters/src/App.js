import React from 'react';
import StarWarsProvider from './context/StarWarsProvider';
import Table from './components/Table';
import Header from './components/Header';

function App() {
  return (
    <div>
      <StarWarsProvider>
        <Header />
        <Table />
      </StarWarsProvider>
    </div>
  );
}

export default App;
