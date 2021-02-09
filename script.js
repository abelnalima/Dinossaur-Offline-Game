const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const score = document.querySelector('.score');

let position = 0;
let isJumping = false;
let point = 0;

function handleKeyup(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jumpDino();
        }
    }
}

function jumpDino() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.floor(Math.random() * 6000);

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
            point += 100;
            updateScore();
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            clearInterval(leftInterval);
            document.body.innerHTML = "<h1 class='gameOver'>Fim de Jogo</h1>";
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

function updateScore() {
    score.innerHTML = point;
}

createCactus();
updateScore();
document.addEventListener('keyup', handleKeyup);