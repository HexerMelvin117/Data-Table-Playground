import React from 'react';
import './App.css';
import Table from './components/Table';
import mockData from './mockData';

function App() {
  // Field por accesor
  return (
    <div className="App">
      <Table
        data={mockData}
        columns={[
          { header: 'Name', accessor: 'name' },
          {
            header: 'Surname',
            accessor: 'surname',
            cell: ({ value, row }) => {
              console.log(row);
              return (
                <div>
                  <span style={{ fontWeight: 600, cursor: 'pointer' }}>
                    {value}
                  </span>
                </div>
              );
            }
          },
          { header: 'Occupation', accessor: 'occupation' },
          { header: 'Alias', accessor: 'alias' },
          { header: 'Options', accessor: '',  cell: ({ value, row }) => <div>{row.values.name}</div> }
        ]}
      />
    </div>
  );
}

export default App;
