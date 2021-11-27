import React from 'react';
import Pagination from '@mui/material/Pagination';
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
}

const TablePaginator: React.FC<TablePaginatorProps> = ({
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
  pageIndex,
  pageSize,
  pageCount,
  goToPage
}) => {
  const handleOnChange = (val: any, pageNumber: number) => {
    if (pageNumber === 0) {
      goToPage(pageNumber);
      return;
    }

    goToPage(pageNumber - 1);
  };

  return (
    <Stack spacing={2}>
      <TablePagination
        showFirstButton={canPreviousPage}
        showLastButton={canNextPage}
        rowsPerPage={pageSize}
        count={30}
        page={pageIndex + 1}
        labelRowsPerPage='Lineas Por Pagina:'
        onPageChange={(val, pageNumber) => {
          handleOnChange(val, pageNumber);
        }}
      />
    </Stack>
  );
};

export default TablePaginator;
