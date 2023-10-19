import React, { useState } from 'react';
import logo from './images/mousegame2.png';
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Register from './Register';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Function to toggle the login form display
  const toggleLogin = () => {
  setShowLogin(!showLogin);
  };

  // Function to toggle the register form display
  const toggleRegister = () => {
  setShowRegister(!showRegister)
  }

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
          <img src={logo} className="logobounce" width="75%" height="auto"></img>
        </div>
      </header>

      <main>
        {showLogin && <Login />}
        {showRegister && <Register />}
        <button className="button-39">HUNT</button>
        <div className="feedContainer">
          <div className="baseFeed">
            Account Details
          </div>
          <div className="historyFeed">
            Your Hunts
          </div>
          <div className="globalFeed">
            Global Hunts
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
