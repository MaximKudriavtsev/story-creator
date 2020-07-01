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
        <div style={{ display: 'flex' }}>
          <div style={{ width: '55%', padding: '14px' }}>
            <Table />
          </div>
          <div style={{ width: '45%', padding: '14px' }}>
            <Export />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
