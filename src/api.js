
const BASE_URL = `http://fitnesstrac-kr.herokuapp.com/api`

export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Login failed"); // or return an error object
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Registration failed"); // or return an error object
  }
};

export async function getUserData(token) {
    try {
      const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/me', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Unable to fetch user data');
    }
  }
  
  export const getActivities = async () => {
    try {
      const response = await fetch(`${BASE_URL}/activities`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const result = await response.json();
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  export const createActivity = async (activityObj) => {
    console.log(activityObj)
    try {
      const response = await fetch(`${BASE_URL}/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${activityObj.token}`,
        },
        body: JSON.stringify(activityObj),
      });
  
      const result = await response.json();
      console.log(result  )
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  export const updateActivity = async (activityId, name, description, token) => {
    const response = await fetch(`${BASE_URL}/activities/${activityId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        description: description
      })
    });
  
    const data = await response.json();
    return data;
  }

  export const getRoutines = async () => {
    try {
      const response = await fetch(`${BASE_URL}/routines`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  export const createRoutine = async (token, name, goal, isPublic = null) => {
    try {
      const response = await fetch(`${BASE_URL}/routines`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          goal,
          isPublic
        })
      });
  
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  };