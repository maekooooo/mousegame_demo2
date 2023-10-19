import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HuntButton({ isLoggedIn, username, onHuntSuccess }) {
  const [isHuntEnabled, setHuntEnabled] = useState(false);
  const [isHunting, setIsHunting] = useState(false);

  useEffect(() => {
    // Set the hunt button to be enabled when a user is logged in
    if (isLoggedIn) {
      setHuntEnabled(true);
    } else {
      setHuntEnabled(false);
    }
  }, [isLoggedIn]);

  const handleHunt = () => {
    if (isHunting) {
      return; // Don't allow multiple hunts simultaneously
    }

    if (isHuntEnabled) {
      setIsHunting(true);

      const goldGained = Math.floor(Math.random() * 16) + 5; // Random number between 5 and 20
      const expGained = Math.floor(Math.random() * 16) + 5;

      axios
        .put(`http://localhost:5000/api/user/${username}/hunt`, { goldGained, expGained })
        .then((response) => {
          if (response.status === 200) {
            // Handle success, e.g., update user data
            setIsHunting(false); // Reset isHunting state
            // Fetch user data and update it in the parent component
            fetchUserData(username);
            console.log('Hunt successful', response.data);
          } else {
            console.log('Failed to trigger hunt');
            setIsHunting(false); // Reset isHunting state on failure
          }
        })
        .catch((error) => {
          console.error('Error triggering hunt:', error);
          setIsHunting(false); // Reset isHunting state on error
        });
    }
  };

  const fetchUserData = (username) => {
    axios
      .get(`http://localhost:5000/api/user/${username}/profile`)
      .then((response) => {
        if (response.status === 200) {
          console.log('User data fetched successfully:', response.data);
          // Call the parent component's function to update userData
          onHuntSuccess(response.data);
        } else {
          console.log('Failed to fetch user data');
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  return (
    <button
      className={`button-hunt${isHuntEnabled ? '' : ' disabled'}`}
      onClick={handleHunt}
      disabled={!isHuntEnabled || isHunting}
    >
      {isHunting ? 'Hunting...' : 'HUNT'}
    </button>
  );
}

export default HuntButton;
