// Canvas Setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

// Player Properties
let player = {
    x: 50,
    y: 300,
    width: 30,
    height: 30,
    color: "cyan",
    speed: 5,
    jumping: false,
    velocityY: 0,
    gravity: 0.5
};

// Mirror World Mechanism
let isMirrorWorld = false;

// Platforms (Normal & Mirror World)
const platforms = [
    { x: 100, y: 350, width: 100, height: 10 },
    { x: 300, y: 300, width: 100, height: 10 },
    { x: 500, y: 250, width: 100, height: 10 }
];

// Handle Player Jump
function jump() {
    if (!player.jumping) {
        player.jumping = true;
        player.velocityY = -10;
    }
}

// Handle World Switching
function switchWorld() {
    isMirrorWorld = !isMirrorWorld;
    player.color = isMirrorWorld ? "red" : "cyan"; // Change color when switching
}

// Handle Key Events
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        switchWorld();
    }
    if (event.code === "ArrowUp") {
        jump();
    }
});

// Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background Color Change based on World
    ctx.fillStyle = isMirrorWorld ? "#440044" : "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Platforms
    ctx.fillStyle = isMirrorWorld ? "purple" : "white";
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, isMirrorWorld ? canvas.height - platform.y - platform.height : platform.y, platform.width, platform.height);
    });

    // Gravity & Jump Physics
    player.velocityY += player.gravity;
    player.y += player.velocityY;

    if (player.y + player.height >= canvas.height) {
        player.y = canvas.height - player.height;
        player.jumping = false;
    }

    // Draw Player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(gameLoop);
}

gameLoop();