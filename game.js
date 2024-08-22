<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jeu de Voiture</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
            font-family: sans-serif;
        }
        canvas {
            display: block;
            background-color: #f4f4f4;
        }
        #gameOverScreen {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: none;
            text-align: center;
        }
        #gameOverScreen button {
            padding: 10px 20px;
            font-size: 20px;
        }
    </style>
</head>
<body>

<canvas id="gameCanvas"></canvas>

<div id="gameOverScreen">
    <h1>Game Over</h1>
    <button onclick="restartGame()">Rejouer</button>
</div>

<script>
// Configuration du jeu
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 600;

let car = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    width: 50,
    height: 100,
    speed: 5
};

let obstacles = [];
let score = 0;
let gameOver = false;

// Contrôles de la voiture
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' && car.x > 0) {
        car.x -= car.speed;
    }
    if (e.key === 'ArrowRight' && car.x < canvas.width - car.width) {
        car.x += car.speed;
    }
});

// Fonction de génération des obstacles
function generateObstacle() {
    let width = Math.random() * 100 + 50;
    let x = Math.random() * (canvas.width - width);
    obstacles.push({
        x: x,
        y: -100,
        width: width,
        height: 30,
        speed: 3
    });
}

// Fonction pour détecter les collisions
function checkCollision(car, obstacle) {
    return !(
        car.y > obstacle.y + obstacle.height ||
        car.y + car.height < obstacle.y ||
        car.x > obstacle.x + obstacle.width ||
        car.x + car.width < obstacle.x
    );
}

// Fonction de mise à jour du jeu
function updateGame() {
    if (gameOver) return;

    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner la voiture
    ctx.fillStyle = 'blue';
    ctx.fillRect(car.x, car.y, car.width, car.height);

    // Générer des obstacles périodiquement
    if (Math.random() < 0.02) {
        generateObstacle();
    }

    // Déplacer et dessiner les obstacles
    for (let i = 0; i < obstacles.length; i++) {
        let obstacle = obstacles[i];
        obstacle.y += obstacle.speed;

        // Dessiner l'obstacle
        ctx.fillStyle = 'red';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        // Vérifier les collisions
        if (checkCollision(car, obstacle)) {
            endGame();
        }

        // Retirer les obstacles qui sortent de l'écran
        if (obstacle.y > canvas.height) {
            obstacles.splice(i, 1);
            i--;
            score++;
        }
    }

    // Afficher le score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);

    // Continuer la boucle de jeu
    requestAnimationFrame(updateGame);
}

// Fonction pour terminer le jeu
function endGame() {
    gameOver = true;
    document.getElementById('gameOverScreen').style.display = 'block';
}

// Fonction pour redémarrer le jeu
function restartGame() {
    car.x = canvas.width / 2 - 25;
    obstacles = [];
    score = 0;
    gameOver = false;
    document.getElementById('gameOverScreen').style.display = 'none';
    updateGame();
}

// Lancer le jeu
updateGame();

</script>
</body>
</html>
