import React, { useState } from 'react';
import logo from './images/mousegame2.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Register from './Register';
import GlobalHunt from './GlobalHunt';
import HuntButton from './HuntButton';

function App() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [reloadFeedContainer, setReloadFeedContainer] = useState(false);

    // Function to toggle the login form display
    const toggleLogin = () => {
        setShowLogin(!showLogin);
    };

    // Function to toggle the register form display
    const toggleRegister = () => {
        setShowRegister(!showRegister);
    };

    // Function to handle user login
    const handleUserLogin = (userData) => {
        setIsLoggedIn(true);
        console.log(userData);
        setUserData(userData);
    };

    // Function to handle user logout
    const handleUserLogout = () => {
        setIsLoggedIn(false);
        setUserData(null);
    };

    // Function to handle display update after a successful Hunt
    const handleHuntSuccess = (response) => {
        if (userData) {
            const updatedUserData = { ...userData };
            updatedUserData.last_hunt = response.user_last_hunt;
            updatedUserData.profile = response.user_profile;
            setUserData(updatedUserData);
        }
    };

    return (
        <div className="App">
            <header>
                <div className="topnav">
                    <a href="#">
                        <button className="button-OS"></button>
                    </a>
                    <a href="#">
                        <button className="button-DISCORD"></button>
                    </a>
                    <a href="#">
                        <button className="button-TWITTER"></button>
                    </a>
                    <div className='button-accounts'>
                        <button className="button-39" id="leftWallet" onClick={toggleLogin}>Login</button>
                        <button className="button-39" id="leftWallet" onClick={toggleRegister}>Register</button>
                    </div>
                </div>
                <div className="App-header">
                    <img src={logo} className="logobounce" width="75%" height="auto" alt="Logo" />
                </div>
            </header>

            <main>
                {showLogin && (
                    <Login
                        isLoggedIn={isLoggedIn}
                        onLogin={handleUserLogin}
                        onLogout={handleUserLogout}
                    />
                )}
                {showRegister && <Register />}
                <p></p>
                <HuntButton
                    isLoggedIn={isLoggedIn}
                    username={userData && userData.profile.username}
                    onHuntSuccess={handleHuntSuccess}
                />
                <div className="feedContainer">
                    <div className="baseFeed">
                        {isLoggedIn ? (
                            <div>
                                {/* Render user data */}
                                {userData && (
                                    <div>
                                        <p>ACCOUNT DETAILS</p>
                                        <p>Username: {userData.profile.username}</p>
                                        <p>Gold: {userData.profile.gold}</p>
                                        <p>EXP: {userData.profile.exp}</p>
                                        <p>Hunt Count: {userData.profile.hunt_count}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Render some default content when the user is not logged in
                            "ACCOUNT DETAILS"
                        )}
                    </div>
                    <div className="historyFeed">
                        {isLoggedIn ? (
                            <div>
                                {/* Render user data */}
                                {userData && (
                                    <div>
                                        <p>LAST HUNT</p>
                                        <p>Gold Gained: {userData.last_hunt.gold_gained}</p>
                                        <p>EXP Gained: {userData.last_hunt.exp_gained}</p>
                                        <p>Timestamp: {userData.last_hunt.timestamp}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Render some default content when the user is not logged in
                            "LAST HUNT"
                        )}
                    </div>
                    <div className="globalFeed">
                        <GlobalHunt /> {/* Render the GlobalHunt component here */}
                    </div>
                </div>
                <button className="delete-account-button" onClick={handleDeleteAccount}>
                    Delete Account
                </button>
            </main>
        </div>
    );
}

export default App;
