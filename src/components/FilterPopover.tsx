import React from 'react';
import styled from 'styled-components';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FilterIcon from './assets/svg/FilterIcon';

interface FilterOptionsPopoverProps {}

const FilterButton = styled.button`
  background: transparent;
  border: none !important;
  cursor: pointer;
  font-size: 0;
  vertical-align: bottom;
  margin-left: 10px;
`;

const FilterContent = styled.div`
  margin: 20px;
`;

const FilterOptionsPopover: React.FC<FilterOptionsPopoverProps> = ({
  children
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <FilterButton aria-describedby={id} onClick={handleClick}>
        <FilterIcon />
      </FilterButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <FilterContent>{children}</FilterContent>
      </Popover>
    </>
  );
};

export default FilterOptionsPopover;
