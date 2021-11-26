import React, { useMemo } from 'react';
import { useTable, CellProps, Column } from 'react-table';
import {
  TableHeader,
  TableContainer,
  TableHead,
  TableBody,
  TableCell
} from './Table.style';

export interface IColumns<T extends {}> {
  header: string;
  accessor: keyof T;
  cell?: (arg1: CellProps<T, string>) => JSX.Element;
}

interface TableProps<T> {
  readonly data: T[];
  columns: IColumns<T>[];
}

export default function Table<T extends {}>(props: TableProps<T>) {
  const { data, columns } = props;

  const memoizedColumns: Column<T>[] = useMemo(() => {
    console.log({ columns });
    return columns.map(column => {
      console.log(column);

      return {
        Header: column.header,
        accessor: column.accessor,
        ...(column.cell && { Cell: column.cell })
      };
    });
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: memoizedColumns,
      data
    });

  return (
    <TableContainer {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableHeader {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableHeader>
            ))}
          </tr>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                );
              })}
            </tr>
          );
        })}
      </TableBody>
    </TableContainer>
  );
}
