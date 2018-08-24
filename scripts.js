/**
 * Define countdown var so we can store a setInterval and later clear it
 */
let countdown;

/**
 * Save DOM elements
 */
const timeLeftDisplayer = document.querySelector('.display__time-left');
const endTimeDisplayer = document.querySelector('.display__end-time');

// Get timers timeButtons
const timeButtons = document.querySelectorAll('.timer__button[data-time]');

// Save all action timeButtons in object
const actionsButtons = {
    start: document.querySelector('.timer__button.-start'),
    stop: document.querySelector('.timer__button.-stop')
};

const bgImg = {
    run: 'https://media.giphy.com/media/JDKxRN0Bvmm2c/giphy.gif',
    finished: 'https://media.giphy.com/media/yj5UdA4elp8Wc/giphy.gif',
    stop: 'https://media.giphy.com/media/3BL45MJDZABqg/giphy.gif'
};


/**
 * Variable to know when timer is running or not
 * @param val
 * @returns {string}
 */
let timerState = {
    runTimer: false, // define if countdown should be running or not
    secondsLeftMs: 0 // store seconds in miliseconds
};

/**
 * Format values to use extra '0' if value < 10
 * @param val
 * @returns {string}
 */
const formatVal = (val) => val < 10 ? `0${val}` : val;

/**
 * Run timer
 * @param seconds
 */
function timer(seconds) {

    // Enable stop button
    actionsButtons.stop.disabled = false;

    // Disable play button
    actionsButtons.start.disabled = true;

    // Clear previous timer
    clearInterval(countdown);

    const now = Date.now(); // Get current time
    const after = now + seconds * 1000; // Get time and 1s now

    // Show time left
    displayTimeLeft(seconds);

    // change gif url and show it
    document.querySelector('.timer').style.backgroundImage = `url("${bgImg.run}")`;

    // Add overlay to display
    document.querySelector('.display').classList.add('-overlay');

    // Show whe timer should end
    displayEndTime(after);

    // If runtimer should be running
    if (timerState.runTimer) {

        // Define setInterval to run every second
        countdown = setInterval(() => {

            // Save seconds in ms in our state object so we can restart the counter from this point if it was paused
            timerState.secondsLeft =  Math.round((after - Date.now()) / 1000);

            // Stop interval if secondsLeft is a negative value
            if (timerState.secondsLeft < 0) {

                // bg gif
                document.querySelector('.timer').style.backgroundImage = `url(${bgImg.finished})`;

                // remove return info
                endTimeDisplayer.textContent = '';

                clearInterval(countdown);
                return
            }

            // Show time left
            displayTimeLeft(timerState.secondsLeft);

        }, 1000);

    }
    ;

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

    // Show values in DOM
    endTimeDisplayer.textContent = `I shall return at ${formatVal(hours)}:${formatVal(minutes)}`;
}

/**
 * Start timer when clicking in button
 */
function startTimer() {
    const seconds = parseInt(this.dataset.time);

    // Enable countdown
    timerState.runTimer = true;

    // Start timer
    timer(seconds);
}

/**
 * Start timer when clicking in button
 */
function stopTimer() {

    // Disable countdown
    timerState.runTimer = false;

    // change gif url and show it
    document.querySelector('.timer').style.backgroundImage = `url("${bgImg.stop}")`;

    // Disable stop button
    actionsButtons.stop.disabled = true;

    // Enable play button
    actionsButtons.start.disabled = false;

    // Stop interval count
    clearInterval(countdown);

}

/**
 * Add event to minutes input
 * Selecting element from "name" tag
 */
document.customForm.addEventListener('submit', function (e) {
    // Prevent form submit
    e.preventDefault();

    // Enable countdown
    timerState.runTimer = true;

    // Start timer with value in seconds
    timer(this.minutes.value * 60);

    // Reset input
    this.reset();
});

/**
 * Add evennt listener to STOP btn
 */
actionsButtons.stop.addEventListener('click', stopTimer);


/**
 * Add evennt listener to START btn
 */
actionsButtons.start.addEventListener('click', function () {

    // Enable countdown
    timerState.runTimer = true;

    // Enable stop button
    actionsButtons.stop.disabled = false;

    // Restart timer from time we paused it
    timer(Number(timerState.secondsLeft));

});

/**
 * Add click event to all btns
 */
timeButtons.forEach(btn => btn.addEventListener('click', startTimer)); // forEach works in node list
// [...timeButtons].map(btn => btn.addEventListener('click', startTimer)); // map doesn't work in nodeList but we can use ... to make it an array
