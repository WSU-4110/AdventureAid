import { Typography, Grid, Container } from '@mui/material';

import Navbar from '../../components/navbar';
import BlogCard from '../../components/card/index';

import './index.scss';


const cardData = [
  {
    imageUrl: "https://www.zicasso.com/static/4c30a671ff4b24f87b152a8360c880dc/6d821/4c30a671ff4b24f87b152a8360c880dc.jpg",
    title: 'Blog 1',
    description: 'Welcome to my blog',
  },
  {
    imageUrl: 'https://image.cnbcfm.com/api/v1/image/107108131-1661279269174-gettyimages-831412090-20170731-tana9023.jpeg?v=1661279373&w=1600&h=900',
    title: 'Blog 2',
    description: 'Welcome to my blog',
  },
  {
    imageUrl: 'https://www.planetware.com/wpimages/2020/06/best-cheap-places-to-travel-may-santorini-greece.jpg',
    title: 'Blog 3',
    description: 'Welcome to my blog',
  },
];

function Blog() {
  return (
    <>
      <Container maxWidth={false} className='blog-container'>
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
        <Grid container direction="row" spacing={4} mt="2rem">
          {cardData.map((data, index) => (
            <Grid item xs={12} md={4} key={index}>
              <BlogCard {...data} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Blog;
