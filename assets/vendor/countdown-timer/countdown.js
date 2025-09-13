// countdown.js
function startCountdown(targetDate) {
    let countdownDate = new Date(targetDate).getTime();

    const interval = setInterval(function () {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display result
        document.getElementById("days").innerHTML = days.toString().padStart(2, "0");
        document.getElementById("hours").innerHTML = hours.toString().padStart(2, "0");
        document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, "0");
        document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, "0");

        // If finished -> restart for the next 5 days
        if (distance < 0) {
            clearInterval(interval);

            // Get current countdown date
            const currentDate = new Date(targetDate);

            // Add 5 days
            currentDate.setDate(currentDate.getDate() + 5);

            // Restart countdown with new date
            startCountdown(currentDate);
        }
    }, 1000);
}

// Initialize countdown (example: starting today + 5 days)
const initialDate = new Date();
initialDate.setDate(initialDate.getDate() + 5);
startCountdown(initialDate);
