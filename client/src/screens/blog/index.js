import { Box, Typography } from '@mui/material';

import './index.scss';


function Blog() {
  return (
    <>
      <Box>
        <Typography variant="h1" fontSize={{ xs: "3rem", md: "5rem" }} textAlign="center">
          Blog
        </Typography>
      </Box>

    </>
  );
}

export default Blog;
