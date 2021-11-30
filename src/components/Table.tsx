import React, { useMemo } from 'react';
import {
  useTable,
  usePagination,
  CellProps,
  Column,
  useFilters
} from 'react-table';
import { ColumnFilterProps } from './ColumnFilter';
import {
  TableHeader,
  TableContainer,
  TableHead,
  TableBody,
  TableCell
} from './Table.style';
import TablePaginator from './TablePaginator';
import ColumnFilter from './ColumnFilter';
import FilterOptionsPopover from './FilterPopover';

interface Page {
  page: number;
  page_size: number;
}

interface OriginalRow<T> {
  original: T;
}

export interface IColumns<T extends {}> {
  header: string;
  accessor?:
    | keyof T
    | ((originalRow: OriginalRow<T>, originalIndex: number | string) => any);
  cell?: (arg1: CellProps<T, string>, arg2: T) => JSX.Element;
  filter?: React.FC<ColumnFilterProps>;
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
        ...(column.cell && { Cell: column.cell }),
        ...(column.filter && { Filter: column.filter })
      };
    });
  }, []) as Column<T>[];

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: ColumnFilter
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    gotoPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
    state
  } = useTable(
    {
      columns: memoizedColumns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
      defaultColumn
    },
    useFilters,
    usePagination
  );

  return (
    <>
      <TableContainer {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => {
                return (
                  <TableHeader {...column.getHeaderProps()}>
                    {column.render('Header')}
                    {column.canFilter && (
                      <FilterOptionsPopover>
                        {column.render('Filter')}
                      </FilterOptionsPopover>
                    )}
                  </TableHeader>
                );
              })}
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
        goToPage={gotoPage}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        nextPage={nextPage}
        previousPage={previousPage}
        pageIndex={state.pageIndex}
        pageSize={state.pageSize}
        pageCount={5}
        setPageSize={setPageSize}
      />
    </>
  );
}
