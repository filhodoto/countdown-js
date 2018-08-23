// Define countdown var so we can store a setInterval and later clear it
let countdown;

/**
 * Run timer
 * @param seconds
 */
function timer(seconds) {

    const now = Date.now(); // Get current time
    const after = now + seconds * 1000; // Get time and 1s now

    // Show seconds
    displaySeconds(seconds);

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

        // Show seconds
        displaySeconds(secondsLeft);

    }, 1000);
}

/**
 * Show numbers
 * @param seconds
 */
function displaySeconds(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60);
    const remainerSeconds = seconds % 60;
    console.log({hours, minutes, remainerSeconds});
}
