import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const loginData = {
      username: username,
      password: password,
    };

    axios.post('/api/user/<username>', loginData, { // Use axios.post for login
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) { // 200 is the standard status for a successful response
          // Login was successful, you can handle the success case here
          console.log('Login successful');
        } else if (response.status === 404) { // Use 404 for user not found
          console.log('User not found');
        } else {
          // Handle other error cases
          console.log('Login failed');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
      });
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
