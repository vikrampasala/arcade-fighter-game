// Creates the canvas and the size of the canvas.
const canvas = document.getElementById('game-canvas');
const c = canvas.getContext('2d');
//Framework for the gravity of how much the player can jump/falls down and creates the width/height of the canvas.
const GRAVITY = 0.6;
const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 576;

//The class and essentially the 2 characters the users play as.
class Sprite {
    constructor({ position, velocity, color, name }) {
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.color = color;
        this.name = name;
        
        this.isAttacking = false;
        this.health = 100;
        this.isDead = false;
    }
//Features for the characters when they die and how the canvas reacts and what happens when the end screen shows.
    draw() {
        if (this.isDead) {
            c.fillStyle = '#4b4d52';
            c.fillRect(this.position.x, CANVAS_HEIGHT - 30, 150, 30);
            return;
        }

        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
// Condition based on if the user attacks with the energy beam.
        if (this.isAttacking) {
            c.fillStyle = '#66fcf1';
            c.fillRect(this.position.x - 25, this.position.y, this.width + 50, this.height);
        }
    }
//Game updates when an event occurs like the character dying and when the time runs out.
    update() {
        this.draw();

        if (this.isDead) {
            this.velocity.x = 0;
            this.velocity.y = 0;
            return;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= CANVAS_HEIGHT) {
            this.velocity.y = 0;
            this.position.y = CANVAS_HEIGHT - this.height;
        } else {
            this.velocity.y += GRAVITY;
        }
    }
// Strikes out the characters when they die or when the time runs out.
    strike() {
        if (this.isDead) return;
        this.isAttacking = true;
        setTimeout(() => { this.isAttacking = false; }, 200);
    }
}
//Details for Player 1 and the start/set position.
const player1 = new Sprite({
    position: { x: 150, y: 0 },
    velocity: { x: 0, y: 0 },
    color: '#ff0055',
    name: 'Player 1'
});
//Details for Player 2 and the set/start position for this character.
const player2 = new Sprite({
    position: { x: 800, y: 0 },
    velocity: { x: 0, y: 0 },
    color: '#00ffcc',
    name: 'Player 2'
});
// Keys for how the user should control the characters.
const keys = {
    a: { pressed: false },
    d: { pressed: false },
    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false }
};

let isMatchOver = false;
let timeRemaining = 99;
let timerId = null;
// This function reanimates the canvas and all the qualities inside for both of the characters.
function animateEngine() {
    window.requestAnimationFrame(animateEngine);
    
    c.fillStyle = '#1c1c22';
    c.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    player1.update();
    player2.update();

    player1.velocity.x = 0;
    if (!player1.isDead && !isMatchOver) {
        if (keys.a.pressed) player1.velocity.x = -6;
        else if (keys.d.pressed) player1.velocity.x = 6;
    }

    player2.velocity.x = 0;
    if (!player2.isDead && !isMatchOver) {
        if (keys.ArrowLeft.pressed) player2.velocity.x = -6;
        else if (keys.ArrowRight.pressed) player2.velocity.x = 6;
    }
// Separates the distance between the two characters.
    let distanceBetweenFighters = Math.abs(player1.position.x - player2.position.x);
// If distance is less than 95 and if the match doesn't completely end, there are 2 if conditions of when player 1 attacks, the health decreases by 20 and if player 2 isn't dead.
    if (distanceBetweenFighters <= 95 && !isMatchOver) {
        
        if (player1.isAttacking && !player2.isDead) {
            player1.isAttacking = false; 
            player2.health -= 20;
            
            if (player2.health <= 0) {
                player2.health = 0;
                player2.isDead = true; 
                isMatchOver = true;
                clearTimeout(timerId);
                
                // FIXED INTERFACE CALL: Toggles class name configurations
                document.getElementById('winner-text').innerText = "PLAYER 1 WINS";
                document.getElementById('game-over-screen').classList.add('active');
            }
            document.getElementById('p2-health-fill').style.width = player2.health + '%';
        }
// Same thing here but if player 2 attacks and player 1 isn't death, player 2 deals 20 damage to player 1.
        if (player2.isAttacking && !player1.isDead) {
            player2.isAttacking = false; 
            player1.health -= 20;
            
            if (player1.health <= 0) {
                player1.health = 0;
                player1.isDead = true; 
                isMatchOver = true;
                clearTimeout(timerId);
                
                // FIXED INTERFACE CALL: Toggles class name configurations
                document.getElementById('winner-text').innerText = "PLAYER 2 WINS";
                document.getElementById('game-over-screen').classList.add('active');
            }
            document.getElementById('p1-health-fill').style.width = player1.health + '%';
        }
    }
}
// Calls the animate function.
animateEngine();
// This function generates the timer of the game. If the game, doesn't end instead of saying a player wins it says time out.
function runMatchTimer() {
    if (timeRemaining > 0 && !isMatchOver) {
        timeRemaining--;
        document.getElementById('match-timer').innerText = timeRemaining;
        timerId = setTimeout(runMatchTimer, 1000);
    } else if (timeRemaining === 0 && !isMatchOver) {
        isMatchOver = true;
        document.getElementById('winner-text').innerText = "TIME OUT";
        document.getElementById('game-over-screen').classList.add('active');
    }
}
//Calls timer function.
runMatchTimer();
// This function resets the game after a round is over each time.
function resetArcadeMatch() {
    isMatchOver = false;
    timeRemaining = 99;
    clearTimeout(timerId);

    player1.health = 100;
    player1.isDead = false;
    player1.isAttacking = false;
    player1.position = { x: 150, y: 0 };
    player1.velocity = { x: 0, y: 0 };
    document.getElementById('p1-health-fill').style.width = '100%';

    player2.health = 100;
    player2.isDead = false;
    player2.isAttacking = false;
    player2.position = { x: 800, y: 0 };
    player2.velocity = { x: 0, y: 0 };
    document.getElementById('p2-health-fill').style.width = '100%';

    document.getElementById('match-timer').innerText = '99';
    
    // FIXED INTERFACE CALL: Disables visibility cleanly
    document.getElementById('game-over-screen').classList.remove('active');

    runMatchTimer();
    console.log("SYSTEM RESET COMPLETE.");
}

document.getElementById('restart-btn').addEventListener('click', resetArcadeMatch);
// For player 1, uses keydown/arrows to move and fight.
window.addEventListener('keydown', (event) => {
    if (isMatchOver) return;

    switch (event.key) {
        case 'd': keys.d.pressed = true; break;
        case 'a': keys.a.pressed = true; break;
        case 'w': if (player1.position.y === CANVAS_HEIGHT - player1.height) player1.velocity.y = -20; break;
        case 'j': player1.strike(); break; 

        case 'ArrowRight': keys.ArrowRight.pressed = true; break;
        case 'ArrowLeft': keys.ArrowLeft.pressed = true; break;
        case 'ArrowUp': if (player2.position.y === CANVAS_HEIGHT - player2.height) player2.velocity.y = -20; break;
        case 'k': player2.strike(); break; 
    }
});
// Same thing, but for player 2, uses keyup instead to move around and fight as well.
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd': keys.d.pressed = false; break;
        case 'a': keys.a.pressed = false; break;
        case 'ArrowRight': keys.ArrowRight.pressed = false; break;
        case 'ArrowLeft': keys.ArrowLeft.pressed = false; break;
    }
});
