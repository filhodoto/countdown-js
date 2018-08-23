// Define countdown var so we can store a setInterval and later clear it
let countdown;

// Save DOM element where will display values
const timeLeftDisplayer = document.querySelector('.display__time-left');
const endTimeDisplayer = document.querySelector('.display__end-time');

/**
 *  Format values to use extra '0' if value < 10
 * @param val
 * @returns {string}
 */
const formatVal = (val) => val < 10 ? `0${val}` : val;

/**
 * Run timer
 * @param seconds
 */
function timer(seconds) {

    const now = Date.now(); // Get current time
    const after = now + seconds * 1000; // Get time and 1s now

    // Show time left
    displayTimeLeft(seconds);

    // Show whe timer should end
    displayEndTime(after);

    // Define setInterval to run every second
    countdown = setInterval(() => {
        // Get ao many seconds are left in seconds (not ms)
        const secondsLeft = Math.round((after - Date.now()) / 1000);

        // Stop interval if secondsLeft is a negative value
        if  (secondsLeft < 0) {
            console.log('clear setInterval');
            clearInterval(countdown);

            return
        }

        // Show time left
        displayTimeLeft(secondsLeft);

    }, 1000);
}

/**
 * Display time left (hh:mm:ss)
 * @param seconds
 */
function displayTimeLeft(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const displayTime = `${formatVal(hours)}:${formatVal(minutes)}:${formatVal(remainingSeconds)}`;

    // Show values in document title
    document.title = displayTime;

    // Show values in DOM
    timeLeftDisplayer.textContent = displayTime;
}

/**
 * Display time when counter should stop
 * @param seconds
 */
function displayEndTime(timestamp) {

    // Get date from timestamp
    const endTime = new Date(timestamp);

    // Get values using date() object getters
    const hours = endTime.getHours();
    const minutes = endTime.getMinutes();
    const seconds = endTime.getSeconds();

    // Show values in DOM
    endTimeDisplayer.textContent = `${formatVal(hours)}:${formatVal(minutes)}:${formatVal(seconds)}`;
}
