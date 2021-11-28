import React from 'react';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';

interface TablePaginatorProps {
  nextPage: () => void;
  previousPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  goToPage: (updater: number | ((pageIndex: number) => number)) => void;
  setPageSize: (pageSize: number) => void;
}

const TablePaginator: React.FC<TablePaginatorProps> = ({
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
  pageIndex,
  pageSize,
  pageCount,
  goToPage,
  setPageSize
}) => {
  const handleOnChange = (
    val: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    pageNumber: number
  ) => {
    goToPage(pageNumber);
  };

  return (
    <Stack spacing={2}>
      <TablePagination
        showFirstButton={canPreviousPage}
        showLastButton={canNextPage}
        rowsPerPage={pageSize}
        count={30}
        page={pageIndex}
        labelRowsPerPage="Lineas Por Pagina:"
        onPageChange={(val, pageNumber) => {
          handleOnChange(val, pageNumber);
        }}
        // @ts-ignore
        onRowsPerPageChange={(
          event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ) => {
          setPageSize(Number(event.target.value));
        }}
      />
    </Stack>
  );
};

export default TablePaginator;
