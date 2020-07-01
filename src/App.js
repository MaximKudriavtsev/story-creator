import React from 'react';
import Export from './export';
import Table from './table';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3 style={{ textAlign: 'center' }}>
          Make stories by adding data into the table. Just click on any cell to enable editing mode.
        </h3>
        <Table />
        <Export />
      </header>
    </div>
  );
}

export default App;
