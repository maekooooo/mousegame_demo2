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

        axios.post('http://localhost:5000/api/register', registrationData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.status === 201) {
                    console.log('Registration successful');
                } else if (response.status === 409) {
                    console.log('Username already exists');
                } else {
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
