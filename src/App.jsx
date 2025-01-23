import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const MagicalTimerAndInputBox = () => {
  const [timer, setTimer] = useState(10); // Timer starts at 10 seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [message, setMessage] = useState('');
  
  const inputRef = useRef(null); // Ref for input box
  const timerRef = useRef(null); // Ref for storing the timer ID

  // Effect to automatically focus on the input box when the page loads
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Start Timer
  const startTimer = () => {
    if (isTimerActive) return; // Don't start a new timer if one is already running
    setIsTimerActive(true);
    
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(timerRef.current);
          setIsTimerActive(false);
          setMessage("Time's Up!");
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  // Stop Timer
  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsTimerActive(false);
    setMessage(''); // Clear any message if stopped manually
  };

  // Reset Timer
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsTimerActive(false);
    setTimer(10); // Reset the timer to 10 seconds
    setMessage(''); // Clear any message
  };

  // Refocus input box
  const focusInputBox = () => {
    inputRef.current.focus();
  };

  return (
    <div className="container">
      <h1>Magical Timer and Input Box</h1>
      <div className="input-box">
        <input 
          type="text" 
          ref={inputRef} 
          placeholder="Type here..." 
        />
        <button onClick={focusInputBox}>Focus Box</button>
      </div>

      <div className="timer">
        <h2>Countdown Timer: {timer}s</h2>
        {message && <p className="message">{message}</p>}
        <button onClick={startTimer} disabled={isTimerActive}>Start Timer</button>
        <button onClick={stopTimer} disabled={!isTimerActive}>Stop Timer</button>
        <button onClick={resetTimer}>Reset Timer</button>
      </div>
    </div>
  );
};

export default MagicalTimerAndInputBox;
