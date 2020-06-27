import React from 'react';
import Export from './export';
import Table from './table';

function App() {
  const [data, setData] = React.useState([]);
  return (
    <div className="App">
      <header className="App-header">
        <Table data={data} setData={setData} />
        <Export data={data} />
      </header>
    </div>
  );
}

export default App;
