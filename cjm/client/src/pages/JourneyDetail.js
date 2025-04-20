import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from '@material-ui/icons';
import apiService from '../services/apiService';

function JourneyDetail() {
  const { id } = useParams();
  const history = useHistory();
  const [journey, setJourney] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchJourney();
  }, [id]);

  const fetchJourney = async () => {
    try {
      const response = await apiService.getJourney(id);
      setJourney(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch journey');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJourney(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.updateJourney(id, journey);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update journey');
    }
  };

  const handleDelete = async () => {
    try {
      await apiService.deleteJourney(id);
      history.push('/journeys');
    } catch (err) {
      setError('Failed to delete journey');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!journey) return <Typography>Journey not found</Typography>;

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" component="h1">
            {journey.title}
          </Typography>
          <Box>
            <IconButton
              color="primary"
              onClick={() => setIsEditing(!isEditing)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Paper style={{ padding: '2rem' }}>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Title"
                  name="title"
                  value={journey.title}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  value={journey.description}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setIsEditing(false)}
                    style={{ marginRight: '1rem' }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Save Changes
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        ) : (
          <>
            <Typography variant="body1" paragraph>
              {journey.description}
            </Typography>
            <Divider style={{ margin: '2rem 0' }} />
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Stages</Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => history.push(`/journeys/${id}/stages/new`)}
              >
                Add Stage
              </Button>
            </Box>
            <List>
              {journey.stages?.map((stage) => (
                <ListItem key={stage.id} divider>
                  <ListItemText
                    primary={stage.name}
                    secondary={stage.description}
                  />
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => history.push(`/journeys/${id}/stages/${stage.id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Paper>
    </Container>
  );
}

 