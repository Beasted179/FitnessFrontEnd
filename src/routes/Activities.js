import React, { useState, useEffect } from 'react';
import { getActivities, createActivity} from '../api';
import { Grid, Button, CardContent, Card , Typography, CircularProgress, Box, TextField, Snackbar} from '@mui/material';
import { useOutletContext } from 'react-router-dom';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayLimit, setDisplayLimit] = useState(10);
  const [showAll, setShowAll] = useState(false);
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('') 
  const [description, setDescription] = useState('')
  const [token, setToken] = useOutletContext();
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState('');
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getActivities();
        setActivities(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchActivities();
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
  async function handleSubmit(){
    const activityObj = {
      token,
      name,
      description
    }
    console.log(activityObj)
         const response = await createActivity(activityObj);
        if (response.error) {
            setErrorMessage(response.message);
            setSuccessMessage('');
        } else {
          setSuccessMessage('Activity created successfully!');
          setErrorMessage('');
          const newActivity = { 
            name: name ,  
            description: description
          };
          setActivities([newActivity, ...activities]);
          setName('');
          setDescription('')
          setShowForm(false);
          setSuccessMessage('')
        }
  }
  const handleCancel = () => {
    setShowForm(false)
  }

  const visibleActivities = showAll ? activities : activities.slice(0, displayLimit);

  return (
    <Grid container spacing={2} mt={5}>
      <Box ml={5} mb={2} display="flex" justifyContent="left" width="100%">
        <Button variant="contained" onClick={handleShowForm}>
          Create Activity
        </Button>
      </Box>
      {showForm && (
        <Grid item xs={12}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Create Activity
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  label="Activity Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  margin="normal"
                  required
                />

                <TextField
                  label="Description"
                  variant="outlined"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
      {activities.slice(0, displayLimit).map((activity) => (
        <Grid key={activity.id} item xs={4}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {activity.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {activity.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
      {activities.length > displayLimit && (
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

export default Activities;

