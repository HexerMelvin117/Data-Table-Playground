import React, { useMemo } from 'react';
import { useTable, usePagination, CellProps, Column, Accessor } from 'react-table';
import {
  TableHeader,
  TableContainer,
  TableHead,
  TableBody,
  TableCell
} from './Table.style';
import TablePaginator from './TablePaginator';

interface Page {
  page: number;
  page_size: number;
}

interface OriginalRow<T> {
  original: T
}

export interface IColumns<T extends {}> {
  header: string;
  accessor?: keyof T | ((originalRow: OriginalRow<T>, originalIndex: number | string) => any);
  cell?: (arg1: CellProps<T, string>, arg2: T) => JSX.Element;
}

interface TableProps<T> {
  readonly data: T[];
  columns: IColumns<T>[];
  page?: Page;
}

export default function Table<T extends {}>(props: TableProps<T>) {
  const { data, columns } = props;

  const memoizedColumns: Column<T>[] = useMemo(() => {
    return columns.map(column => {
      return {
        Header: column.header,
        ...(column.accessor && {
            accessor: column.accessor
          }),
        ...(column.cell && { Cell: column.cell })
      };
    });
  }, []) as Column<T>[];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state
  } = useTable(
    {
      columns: memoizedColumns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }
    },
    usePagination
  );

  return (
    <>
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
          {page.map((row, i) => {
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
      <TablePaginator
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        nextPage={nextPage}
        previousPage={previousPage}
        pageIndex={state.pageIndex}
        pageSize={state.pageSize}
        pageCount={5}
      />
    </>
  );
}
