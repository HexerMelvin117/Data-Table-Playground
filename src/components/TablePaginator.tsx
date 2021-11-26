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
}

const TablePaginator: React.FC<TablePaginatorProps> = ({
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
  pageIndex,
  pageSize,
  pageCount
}) => {
  const handleOnChange = (val: any, pageNumber: number) => {
    console.log({val});
    if (pageNumber > (pageIndex + 1)) {
      nextPage();
      return;
    };

    if (pageNumber < (pageIndex + 1)) {
      previousPage();
      return;
    }
  }

  return (
    <Stack spacing={2}>
      <Pagination
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
