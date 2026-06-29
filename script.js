let timerId = null;
let startTime = 0;
let elapsedTime = 0; 
let isRunning = false;
let isPaused = false;

// DOM Elements
const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const stopBtn = document.getElementById("stop");

// Initial state
window.onload = () => {
    resetDisplay();
};

function start() {
    if (isRunning) return;

    isRunning = true;
    isPaused = false;
    
    // Set start time relative to any existing elapsed time
    startTime = Date.now() - elapsedTime; 
    timerId = setInterval(updateTime, 10); 

    // Adjust button states per acceptance criteria
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    stopBtn.disabled = false;
    pauseBtn.innerText = "pause";
}

function pause() {
    if (!isRunning && !isPaused) return;

    if (!isPaused) {
        // Transitioning to PAUSE state
        clearInterval(timerId);
        timerId = null;
        // Capture exact elapsed time up to this millisecond
        elapsedTime = Date.now() - startTime; 
        isPaused = true;
        
        pauseBtn.innerText = "continue";
        startBtn.disabled = true; 
        stopBtn.disabled = false;
    } else {
        // Transitioning back to RUNNING state (Continue)
        isPaused = false;
        startTime = Date.now() - elapsedTime;
        timerId = setInterval(updateTime, 10);
        
        pauseBtn.innerText = "pause";
        startBtn.disabled = true;
        stopBtn.disabled = false;
    }
}

function stop() {
    // Clear any active interval completely
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
    
    // Reset all state flags
    isRunning = false;
    isPaused = false;
    elapsedTime = 0;

    // Reset UI back to original state
    timeDisplay.innerText = "00:00:00";
    pauseBtn.innerText = "pause";
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    stopBtn.disabled = true;
}

function updateTime() {
    if (isPaused) return;
    
    elapsedTime = Date.now() - startTime;

    let totalSeconds = Math.floor(elapsedTime / 1000);
    let seconds = totalSeconds % 60;
    let minutes = Math.floor(totalSeconds / 60) % 60;
    let hours = Math.floor(totalSeconds / 3600);

    timeDisplay.innerText = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
}

function pad(number) {
    return number < 10 ? "0" + number : number;
}

function resetDisplay() {
    timeDisplay.innerText = "00:00:00";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    stopBtn.disabled = true;
    pauseBtn.innerText = "pause";
}