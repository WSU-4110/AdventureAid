import { Typography, Grid, Container } from '@mui/material';

import Navbar from '../../components/navbar';
import './index.scss';


function Blog() {
  return (
    <>
      <Container maxWidth={false} className='container'>
        <Grid container
          direction="column"
          spacing={4}
        >
          <Grid item mt="1rem">
            <Navbar />
          </Grid>
          <Grid item>
            <Typography variant="h1" fontSize={{ xs: "3rem", md: "5rem" }} textAlign="center">
              Blog
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Blog;
