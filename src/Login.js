import React, {
    useState
} from 'react';
import axios from 'axios';

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState(null);

    const handleLogin = () => {
        const loginData = {
            username: username,
            password: password,
        };

        axios.post(`http://localhost:5000/api/user/${username}`, loginData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log('Login successful');
                    props.onLogin(response.data);
                } else if (response.status === 404) {
                    console.log('User not found');
                } else {
                    console.log('Login failed');
                }
            })
            .catch((error) => {
                console.error('Error during login:', error);
            });
    };

    const handleLogout = () => {
        props.onLogout();
    };

    const fetchUserData = (username) => {
        axios.get(`http://localhost:5000/api/user/${username}/profile`)
            .then((response) => {
                if (response.status === 200) {
                    console.log('User data fetched successfully:', response.data);
                    fetchUserData(username);
                    setUserData(response.data);
                } else {
                    console.log('Failed to fetch user data');
                }
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    };

    return (
        <div className="login-form">
            {props.isLoggedIn ? (
                // Render logout button if the user is logged in
                <button onClick={handleLogout}>Logout</button>
            ) : (
                // Render login form if the user is not logged in
                <div>
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
            )}
        </div>
    );
}

export default Login;
