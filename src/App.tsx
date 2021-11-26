import React from 'react';
import './App.css';
import Table from './components/Table';
import mockData from './mockData';

function App() {
  return (
    <div className="App">
      <Table
        data={mockData}
        columns={[
          { header: 'Name', accessor: 'name' },
          {
            header: 'Surname',
            accessor: 'surname',
            cell: person => {
              return (
                <div>
                  <span style={{ fontWeight: 600, cursor: 'pointer' }}>
                    {person.row.values.surname}
                  </span>
                </div>
              );
            }
          }
        ]}
      />
    </div>
  );
}

export default App;
