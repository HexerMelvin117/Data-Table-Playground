import React from 'react';
import Pagination from '@mui/material/Pagination';
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
    goToPage(pageNumber - 1);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        showFirstButton={canPreviousPage}
        showLastButton={canNextPage}
        count={pageCount}
        page={pageIndex + 1}
        onChange={(val, pageNumber) => {
          handleOnChange(val, pageNumber);
        }}
      />
    </Stack>
  );
};

export default TablePaginator;
