import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GlobalHunt() {
  const [globalHuntData, setGlobalHuntData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initialize as loading

  useEffect(() => {
    // Fetch global hunt data when the component mounts
    fetchGlobalHuntData();
  }, []);

  const fetchGlobalHuntData = () => {
    axios.get('http://localhost:5000/api/global')
      .then((response) => {
        if (response.status === 200) {
          // Set the fetched data to the state
          setGlobalHuntData(response.data);
        } else {
          console.log('Failed to fetch global hunt data');
        }
      })
      .catch((error) => {
        console.error('Error fetching global hunt data:', error);
      })
      .finally(() => {
        setIsLoading(false); // No longer loading, whether successful or not
      });
  };

  return (
    <div className="global-hunt-container">
      <h2>GLOBAL HUNT</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        globalHuntData.map((hunt, index) => (
          <div key={index} className="hunt-item">
            <p>
              {hunt.timestamp}: {hunt.username} hunted, yielding {hunt.gold_gained} gold and {hunt.exp_gained} exp.
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default GlobalHunt;
