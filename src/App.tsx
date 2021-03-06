import React from 'react';
import './App.css';
import Table from './components/Table';
import ColumnFilter from './components/ColumnFilter';
import mockData from './mockData';

function App() {
  return (
    <div className="App">
      <Table
        data={mockData}
        columns={[
          { header: 'Name', accessor: 'name', filter: ColumnFilter },
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
          { header: 'Options',  accessor: (originalRow) => {
            console.log(originalRow.original)
            return;
          }, cell: ({ value, row }) => <div>{row.values.name}</div> }
        ]}
      />
    </div>
  );
}

export default App;
