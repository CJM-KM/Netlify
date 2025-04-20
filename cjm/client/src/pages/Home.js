import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@material-ui/core';

function Home() {
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        textAlign="center"
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Customer Journey Mapper
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Visualize and optimize your customer experience
        </Typography>
        <Box mt={4}>
          <Button
            component={Link}
            to="/create-journey"
            variant="contained"
            color="primary"
            size="large"
            style={{ marginRight: '1rem' }}
          >
            Create New Journey
          </Button>
          <Button
            component={Link}
            to="/journeys"
            variant="outlined"
            color="primary"
            size="large"
          >
            View Journeys
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Home; 