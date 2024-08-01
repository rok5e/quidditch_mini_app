// Get basic styling from Telegram
document.addEventListener('DOMContentLoaded', function () {
    const themeParams = window.Telegram.WebApp.themeParams;

    if (themeParams.bg_color) {
        document.body.style.backgroundColor = themeParams.bg_color;
    }

    if (themeParams.text_color) {
        document.body.style.color = themeParams.text_color;
    }

    if (themeParams.button_color) {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.style.backgroundColor = themeParams.button_color;
        });
    }

    if (themeParams.button_text_color) {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.style.color = themeParams.button_text_color;
        });
    }
});

// Game
let snitch;
let snitchMoveInterval;
let startTime;

function startGame() {
    // Hide intro elements
    document.querySelector('.intro-image').style.display = 'none';
    document.querySelector('p').style.display = 'none';
    document.getElementById('start-button').style.display = 'none';
	document.querySelector('.game-window').style.display = 'none';

    // Show snitch and game window
    snitch = document.querySelector('.game-snitch');
    snitch.style.display = 'block';

    // Position snitch randomly off-screen to start
    moveSnitchOffScreen();

    // Start moving the snitch
    startMovingSnitch();

    // Start timing
    startTime = new Date().getTime();
}

function moveSnitchOffScreen() {
    const container = document.querySelector('.container');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const snitchWidth = snitch.offsetWidth;
    const snitchHeight = snitch.offsetHeight;

    // Random position off the screen
    const x = Math.random() * (containerWidth - snitchWidth);
    const y = Math.random() * (containerHeight - snitchHeight);

    snitch.style.left = `${x}px`;
    snitch.style.top = `${y}px`;
}

function startMovingSnitch() {
	if (snitchMoveInterval) {
		clearInterval(snitchMoveInterval);
	}
    snitchMoveInterval = setInterval(() => {
        moveSnitch();
    }, 500); // Change position every 500ms
}

function moveSnitch() {
    const container = document.querySelector('.container');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const snitchWidth = snitch.offsetWidth;
    const snitchHeight = snitch.offsetHeight;

    // Random new position within the container
    const x = Math.random() * (containerWidth - snitchWidth);
    const y = Math.random() * (containerHeight - snitchHeight);

    snitch.style.left = `${x}px`;
    snitch.style.top = `${y}px`;
}

function stopGame() {
	if (snitchMoveInterval) {
		console.log('Stopping Snitch movement');
		clearInterval(snitchMoveInterval);
		snitchMoveInterval = null;
	} else {
		console.log('No interval to clear');
	}

    // Calculate time taken
    const endTime = new Date().getTime();
    const timeTaken = (endTime - startTime) / 1000; // in seconds

    // Display time
    document.querySelector('.catching-time').textContent = `${timeTaken.toFixed(2)} seconds`;

    // Show replay button and time
    document.querySelector('.game-window').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    snitch = document.querySelector('.game-snitch');

    snitch.addEventListener('click', () => {
        stopGame();
    });
	
	document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('replay-button').addEventListener('click', startGame);
});