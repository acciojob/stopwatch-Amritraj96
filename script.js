//your code here
let timerId = null;
let startTime = 0;
let elapsedTime = 0; // Tracks total milliseconds passed
let isRunning = false;

// DOM Elements
const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const stopBtn = document.getElementById("stop");

// Initial setup on load
window.onload = () => {
    resetDisplay();
};

function start() {
    if (isRunning) return;

    isRunning = true;
    // Calculate start time relative to already elapsed time
    startTime = Date.now() - elapsedTime; 
    
    // Update the UI at a high frequency (~60 FPS) to maintain accuracy
    timerId = setInterval(updateTime, 16); 

    // Button states
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    stopBtn.disabled = false;
    pauseBtn.innerText = "pause";
}

function pause() {
    if (!isRunning) return;

    if (timerId) {
        // Pausing the timer
        clearInterval(timerId);
        timerId = null;
        isRunning = false;
        pauseBtn.innerText = "continue";
        startBtn.disabled = true; // Keep start disabled during pause
    } else {
        // Continuing from pause
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerId = setInterval(updateTime, 16);
        pauseBtn.innerText = "pause";
    }
}

function stop() {
    // Clear the active interval timer
    clearInterval(timerId);
    timerId = null;
    isRunning = false;
    elapsedTime = 0;

    // Reset UI Elements
    resetDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    stopBtn.disabled = true;
    pauseBtn.innerText = "pause";
}

function updateTime() {
    elapsedTime = Date.now() - startTime;

    // Convert milliseconds to total seconds, minutes, and hours
    let totalSeconds = Math.floor(elapsedTime / 1000);
    
    let seconds = totalSeconds % 60;
    let minutes = Math.floor(totalSeconds / 60) % 60;
    let hours = Math.floor(totalSeconds / 3600);

    // Format as HH:MM:SS with leading zeros
    let formattedTime = 
        pad(hours) + ":" + 
        pad(minutes) + ":" + 
        pad(seconds);

    timeDisplay.innerText = formattedTime;
}

function pad(number) {
    return number < 10 ? "0" + number : number;
}

function resetDisplay() {
    timeDisplay.innerText = "00:00:00";
    pauseBtn.disabled = true;
    stopBtn.disabled = true;
}