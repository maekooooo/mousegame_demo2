import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    const registrationData = {
      username: username,
      password: password,
    };

    axios.post('/api/register', registrationData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 201) {
          // Registration was successful, you can handle the success case here
          console.log('Registration successful');
        } else if (response.status === 409) {
          // Username already exists, handle this case
          console.log('Username already exists');
        } else {
          // Handle other error cases
          console.log('Registration failed');
        }
      })
      .catch((error) => {
        console.error('Error during registration:', error);
      });
  };

  return (
    <div className="register-form">
      <h2>Register New Account</h2>
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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
