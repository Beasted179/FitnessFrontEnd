import React, { useState, useEffect } from 'react';
import { getRoutines, createRoutine } from '../api';
import { Grid, Button, CardContent, Card, Typography, CircularProgress, Box, TextField, Snackbar } from '@mui/material';
import { useOutletContext } from 'react-router-dom';

const Routines = () => {
  const [routines, setRoutines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayLimit, setDisplayLimit] = useState(10);
  const [showAll, setShowAll] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState('');
  const [token, setToken] = useOutletContext();

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const data = await getRoutines();
        setRoutines(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoutines();
  }, []);

  const handleShowMore = () => {
    setDisplayLimit(displayLimit + 10);
  };

  const handleShowLess = () => {
    setDisplayLimit(displayLimit - 10);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleSubmit = async () => {
    const isPublic = true; // or false, depending on your needs
    const response = await createRoutine(token, name, goal, isPublic);
    if (response.error) {
      setErrorMessage(response.message);
      setSuccessMessage('');
    } else {
      setSuccessMessage('Routine created successfully!');
      setErrorMessage('');
      const newRoutine = {
        name: name,
        goal: goal
      };
      setRoutines([newRoutine, ...routines]);
      setName('');
      setGoal('');
      setShowForm(false);
      setSuccessMessage('');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const visibleRoutines = showAll ? routines : routines.slice(0, displayLimit);

  return (
    <Grid container spacing={2} mt={5}>
      <Box ml={5} mb={2} display="flex" justifyContent="left" width="100%">
        <Button variant="contained" onClick={handleShowForm}>
          Create Routine
        </Button>
      </Box>
      {showForm && (
        <Grid item xs={12}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Create Routine
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  label="Routine Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  margin="normal"
                  required
                />
                <TextField
                  label="Goal"
                  variant="outlined"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  margin="normal"
                  required
                />
                {errorMessage && (
                  <Typography color="error" mb={2}>
                    {errorMessage}
                  </Typography>
                )}
                {successMessage && (
                  <Snackbar
                    open={Boolean(successMessage)}
                    message={successMessage}
                    autoHideDuration={5000}
                    onClose={() => setSuccessMessage('')}
                  />
                )}
                <Box mt={2} mb={2} display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    onClick={handleCancel}
                    style={{ marginRight: "8px" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    style={{ marginLeft: "8px" }}
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      )}
      {routines.slice(0, displayLimit).map((routine) => (
        <Grid key={routine.id} item xs={4}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {routine.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {routine.goal}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
      {routines.length > displayLimit && (
        <Grid item xs={12}>
          <Box mt={2} display="flex" justifyContent="center">
            {displayLimit <= 10 ? (
              <Button variant="contained" onClick={handleShowMore}>
                See More
              </Button>
            ) : (
              <>
                <Box ml={2} mb={2}>
                  <Button variant="contained" onClick={handleShowLess}>
                    See Less
                  </Button>
                </Box>

                <Box ml={2} mb={2}>
                  <Button variant="contained" onClick={handleShowMore}>
                    See More
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default Routines;