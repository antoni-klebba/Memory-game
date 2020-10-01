const cardsImg = ["cheetah", "cheetah", "fish", "fish", "flamingo", "flamingo", "frog", "frog", "giraffe", "giraffe", "parrot", "parrot", "snake", "snake", "turtle", "turtle", "zebra", "zebra"]
const startReset = document.querySelector('.startBtn button');
const panel = document.querySelector('.panel')

let cards = document.querySelectorAll("main div");
cards = [...cards];

let activeCard = "";
const activeCards = [];
const gamePairs = cards.length / 2;
let gameResult = 0;
let delay = 2000;

const loadPage = () => cards.forEach(card => card.classList.add('hidden'))

const startGame = () => {
    if (startReset.classList.contains("reset")) document.location.reload(true);
    else {
        cards.forEach(card => {
            const position = Math.floor(Math.random() * cardsImg.length)
            card.classList.add(cardsImg[position]);
            cardsImg.splice(position, 1);
            cards.forEach(card => {
                card.classList.remove('hidden');
            })
        })
        setTimeout(function () {
            cards.forEach(card => {
                card.classList.add('hidden');
                card.addEventListener('click', clickCard);
            })
        }, delay)
    }
}

const clickCard = function () {
    activeCard = this;

    if (activeCard == activeCards[0]) return;

    activeCard.classList.remove("hidden");

    if (activeCards.length === 0) {
        activeCards[0] = activeCard
        return;
    } else {
        cards.forEach(card => card.removeEventListener('click', clickCard))
        activeCards[1] = activeCard;
        setTimeout(function () {
            if (activeCards[0].className === activeCards[1].className) {
                activeCards.forEach(activeCard => activeCard.classList.add('off'))
                gameResult++;
                cards = cards.filter(card => !card.classList.contains('off'));
                if (gameResult == gamePairs) {
                    clearInterval(idI)
                }
            } else {
                activeCards.forEach(activeCard => activeCard.classList.add('hidden'))
            }
            activeCard = "";
            activeCards.length = 0;
            cards.forEach(card => card.addEventListener('click', clickCard))
        }, 500)
    }
}

const buttonTextContent = () => {
    setTimeout(function () {
        startReset.textContent = "Reset";
        startReset.classList.add('reset');
    }, delay)
}

// Timer
let time = 0; //dziesiętne sekundy
let idI;

const timer = () => {
    if (startReset.classList.contains("reset")) document.location.reload(true);
    else {
        setTimeout(function () {
            idI = setInterval(start, 100);
        }, delay)
    }
    const start = () => {
        time++;
        panel.textContent = `${(time / 10).toFixed(1)} s`;
    }
}
//End

// Delay
const input = document.querySelector('.delay input');
const delayTime = document.querySelector('.delayTime');

function handleUpdate() {
    input.value = this.value;
    delay = input.value * 1000;
    delayTime.textContent = `${delay / 1000}s`
}

input.addEventListener('change', handleUpdate)
input.addEventListener('mousemove', handleUpdate)
//End

startReset.addEventListener('click', startGame);
startReset.addEventListener('click', timer);
startReset.addEventListener('click', buttonTextContent);


// init();
// timer();
loadPage();