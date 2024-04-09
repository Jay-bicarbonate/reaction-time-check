import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Custom CSS for dark theme

function App() {
  const [username, setUsername] = useState('');
  const [showInput, setShowInput] = useState(true);
  const [showUsername, setShowUsername] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [countdownComplete, setCountdownComplete] = useState(false);
  const [clickMeButtonVisible, setClickMeButtonVisible] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [responseTime, setResponseTime] = useState(0);
  const [timerValue, setTimerValue] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    let timer;
    if (showTimer && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
    } else if (showTimer && countdown === 0) {
      // Timer finished, do something here
      console.log('Timer finished!');
      setShowTimer(false);
      setCountdownComplete(true);
    }

    return () => clearInterval(timer);
  }, [showTimer, countdown]);

  useEffect(() => {
    let clickMeTimer;
    if (countdownComplete) {
      const randomDelay = Math.floor(Math.random() * 5 + 1) * 1000; // Random delay between 1 to 5 seconds in milliseconds
      clickMeTimer = setTimeout(() => {
        setClickMeButtonVisible(true);
        setStartTime(Date.now());
      }, randomDelay);
    }
    
    return () => clearTimeout(clickMeTimer);
  }, [countdownComplete]);

  useEffect(() => {
    if (showTimer && countdownComplete) {
      const timerInterval = setInterval(() => {
        setTimerValue((prevValue) => prevValue + 1);
      }, 1);

      return () => clearInterval(timerInterval);
    }
  }, [showTimer, countdownComplete]);

  const handleNext = () => {
    setShowInput(false);
    setShowUsername(true);
  };

  const handleStart = () => {
    setShowUsername(false);
    setShowTimer(true);
    // Additional action when starting the activity
  };

  const handleButtonClick = () => {
    setEndTime(Date.now()); // Record the end time when the "Click Me" button is clicked
    setStartTime(startTime); // Ensure startTime remains the same
    const timeDifference = endTime - startTime; // Calculate the time difference in milliseconds
    setResponseTime(timeDifference);
    console.log('Response Time:', timeDifference, 'milliseconds');
    if (clickCount === 1) {
      setClickMeButtonVisible(false); // Hide the button when clicked twice
    }
    setClickCount((prevCount) => prevCount + 1);
  };

  const resetActivity = () => {
    setUsername('');
    setShowInput(true);
    setShowTimer(false);
    setCountdown(3);
    setCountdownComplete(false);
    setResponseTime(0);
    setClickMeButtonVisible(false);
    setClickCount(0);
    // setStartButtonVisible(true); // Reset start button visibility
  };

  return (
    <div className="main-container">
      {showTimer ? (
        <div className="text-center">
          <h1 className="mb-4">{countdown === 0 ? 'Ready!!' : countdown}</h1>
        </div>
      ) : (
        <div className="text-center">
          {showInput ? (
            <>
              <h1 className="mb-4">Welcome</h1>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            </>
          ) : (
            <div className='username'>
            {showUsername ? (
            <>
              <div className='container-start'>
              <h2 className="mb-4">Hi, {username}</h2>
              <p>To start the activity, press the button whenever you're ready.</p>
              <button className="btn btn-success" onClick={handleStart}>
                Start
              </button>
              </div>
            </>
            ):(console.log("none"))}
            </div>
          )}
        </div>
      )}
<div className="response-container text-center">
  {clickMeButtonVisible && (
    <button className="btn btn-success mt-3" onClick={handleButtonClick}>
      Click Me
    </button>
  )}
  {responseTime > 0 && (
    <div>
      <p>Response Time: {responseTime} milliseconds</p>
      <button className="btn btn-danger mt-3" onClick={resetActivity}>
        Reset
      </button>
    </div>
  )}
</div>
    </div>
  );
}

export default App;
