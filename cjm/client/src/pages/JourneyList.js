import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Box,
  Paper,
} from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import apiService from '../services/apiService';

function JourneyList() {
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJourneys();
  }, []);

  const fetchJourneys = async () => {
    try {
      const response = await apiService.getJourneys();
      setJourneys(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch journeys');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiService.deleteJourney(id);
      setJourneys(journeys.filter(journey => journey.id !== id));
    } catch (err) {
      setError('Failed to delete journey');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Customer Journeys
        </Typography>
        <Button
          component={Link}
          to="/create-journey"
          variant="contained"
          color="primary"
          style={{ marginBottom: '1rem' }}
        >
          Create New Journey
        </Button>
      </Box>

      <Paper>
        <List>
          {journeys.map((journey) => (
            <ListItem key={journey.id} divider>
              <ListItemText
                primary={journey.title}
                secondary={journey.description}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  component={Link}
                  to={`/journeys/${journey.id}/edit`}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(journey.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default JourneyList; 