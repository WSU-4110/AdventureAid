import React from 'react';
import { Box, InputBase, InputAdornment } from "@mui/material";
import { styled } from '@mui/system';
import './index.scss';

const StyledInput = styled(InputBase)({
  padding: '10px',
  borderRadius: '20px',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  width: '100%',
  '&:focus': {
    borderColor: '#007bff',
    boxShadow: '0 0 5px rgba(0, 123, 255, 0.5)',
  },
});

const SearchBar = ({ onChange, value, label }) => {
  return (
    <Box className="searchbar-container">
      <StyledInput
        value={value}
        onChange={onChange}
        startAdornment={
          <InputAdornment position="start" className="searchbar-label">
            {label}
          </InputAdornment>
        }
      />
    </Box>
  );
}

export default SearchBar;
