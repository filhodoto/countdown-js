// Define countdown var so we can store a setInterval and later clear it
let countdown;

// Save DOM elementsvalues
const timeLeftDisplayer = document.querySelector('.display__time-left');
const endTimeDisplayer = document.querySelector('.display__end-time');

// Get all buttons
const buttons = document.querySelectorAll('.timer__button');

const gifUrl = {
    beBack: 'https://media.giphy.com/media/JDKxRN0Bvmm2c/giphy.gif',
    back: 'https://media.giphy.com/media/yj5UdA4elp8Wc/giphy.gif'
};

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

    // Clear previous timer
    clearInterval(countdown);

    const now = Date.now(); // Get current time
    const after = now + seconds * 1000; // Get time and 1s now

    // Show time left
    displayTimeLeft(seconds);

    // change gif url and show it
    document.querySelector('.timer').style.backgroundImage = `url("${gifUrl.beBack}")`;

    // Add overlay to display
    document.querySelector('.display').classList.add('-overlay');

    // Show whe timer should end
    displayEndTime(after);

    // Define setInterval to run every second
    countdown = setInterval(() => {
        // Get ao many seconds are left in seconds (not ms)
        const secondsLeft = Math.round((after - Date.now()) / 1000);

        // Stop interval if secondsLeft is a negative value
        if  (secondsLeft < 0) {

            // bg gif
            document.querySelector('.timer').style.backgroundImage = `url(${gifUrl.back})`

            // remove return info
            endTimeDisplayer.textContent = '';

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

    // Show values in DOM
    endTimeDisplayer.textContent = `I shall return at ${formatVal(hours)}:${formatVal(minutes)}`;
}

/**
 * Start timer when clicking in button
 */
function startTimer () {
    const seconds = parseInt(this.dataset.time);

    // Start timer
    timer(seconds);
}

/**
 * Add event to minutes input
 * Selecting element from "name" tag
 */
document.customForm.addEventListener('submit', function(e) {
    // Prevent form submit
    e.preventDefault();

    // Start timer with value in seconds
    timer(this.minutes.value * 60);

    // Reset input
    this.reset();
});

/**
 * Add click event to all btns
 */
buttons.forEach(btn => btn.addEventListener('click', startTimer)); // forEach works in node list
// [...buttons].map(btn => btn.addEventListener('click', startTimer)); // map doesn't work in nodeList but we can use ... to make it an array
