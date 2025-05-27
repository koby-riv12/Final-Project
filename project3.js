document.addEventListener("DOMContentLoaded", () => {
    const dino = document.getElementById("dino");
    const turtle = document.getElementById("turtle");
    const fish = document.getElementById("fish");
    const cactus = document.getElementById("cactus");
    const scoreDisplay = document.getElementById("score");
    const characterDropdown = document.getElementById("character-dropdown");

    const startBtn = document.getElementById("start-btn");
    const tryAgainBtn = document.getElementById("try-again-btn");
    const chooseCharBtn = document.getElementById("choose-char-btn");
    const pickBgBtn = document.getElementById("pick-bg-btn");

    let isJumping = false;
    let gameInterval;
    let score = 0;
    let gameRunning = false;
    let selectedCharacter = dino;

    function toggleCharacterDropdown() {
        characterDropdown.style.display = characterDropdown.style.display === "block" ? "none" : "block";
    }

    function chooseCharacter(choice) { 
        // Hide all characters
        [dino, turtle, fish].forEach(char => char.style.display = "none");

        // Show selected character
        if (choice === "turtle") { 
            selectedCharacter = turtle;
        } else if (choice === "fish") {
            selectedCharacter = fish;
        } else {
            selectedCharacter = dino;
        }
        selectedCharacter.style.display = "block";
        characterDropdown.style.display = "none";
    }

    function jump() {
        if (isJumping) return;
        isJumping = true;
        selectedCharacter.classList.add("jump");

        setTimeout(() => {
            selectedCharacter.classList.remove("jump");
            isJumping = false;
        }, 500);
    }

    function startGame() {
        if (gameRunning) return;
        gameRunning = true;
        score = 0;
        updateScore();
        
        cactus.style.animation = "moveCactus 2s linear infinite";

        gameInterval = setInterval(() => {
            checkCollision();
            checkJumpOver();
        }, 100);
    }

    function checkJumpOver() {
        let charBottom = parseInt(window.getComputedStyle(selectedCharacter).getPropertyValue("bottom"));
        let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
        
        if (cactusLeft < 100 && cactusLeft > 50 && charBottom > 40) { 
            score++;
            updateScore();
        }
    }

    function checkCollision() { 
        let charBottom = parseInt(window.getComputedStyle(selectedCharacter).getPropertyValue("bottom"));
        let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

        if (cactusLeft < 100 && cactusLeft > 50 && charBottom < 40) {
            alert("Game Over! Your Score: " + score);
            resetGame();
        }
    }

    function resetGame() { 
        clearInterval(gameInterval);
        gameRunning = false;
        score = 0;
        updateScore();
        
        cactus.style.animation = "none";
        requestAnimationFrame(() => {
            cactus.style.animation = "moveCactus 2s linear infinite";
        });
    }

    function updateScore() {
        scoreDisplay.textContent = "Score: " + score;
    }

    function pickBackground() {
        const colors = ["lightblue", "pink", "lightgreen", "orange", "purple"];
        document.querySelector(".game").style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    }

    document.addEventListener("keydown", event => {
        if (event.code === "Space") jump();
    });

    // Attach event listeners to buttons
    startBtn.addEventListener("click", startGame);
    tryAgainBtn.addEventListener("click", resetGame);
    chooseCharBtn.addEventListener("click", toggleCharacterDropdown);
    pickBgBtn.addEventListener("click", pickBackground);

    document.getElementById("char-dino").addEventListener("click", () => chooseCharacter("dino"));
    document.getElementById("char-turtle").addEventListener("click", () => chooseCharacter("turtle"));
    document.getElementById("char-fish").addEventListener("click", () => chooseCharacter("fish"));
});

