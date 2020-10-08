const cardsImg = ["cheetah", "cheetah", "fish", "fish", "flamingo", "flamingo", "frog", "frog", "giraffe", "giraffe", "parrot", "parrot", "snake", "snake", "turtle", "turtle", "zebra", "zebra"]
const startReset = document.querySelector('.startBtn button');
const panel = document.querySelector('.panel')

let cards = document.querySelectorAll("main div");
cards = [...cards];

// Variables for Cards
let activeCard = "";
const activeCards = [];
const gamePairs = cards.length / 2;
let gameResult = 0;
//Variable for delay
let delay = 2000;
// Variables for playerScore
let startTime = 0
let endTime = 0
let correctAnswers = 0;
let incorrectAnswers = 0;

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
                startTime = new Date().getTime();
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
                activeCards.forEach(activeCard => activeCard.classList.add('off-transition'));
                activeCards.forEach(activeCard => activeCard.classList.add('off'));
                gameResult++;
                correctAnswers++;
                cards = cards.filter(card => !card.classList.contains('off'));
                if (gameResult == gamePairs) {
                    clearInterval(idI);
                    endTime = new Date().getTime();
                    playerScore();
                }
            } else {
                activeCards.forEach(activeCard => activeCard.classList.add('hidden'))
                incorrectAnswers++;
            }
            activeCard = "";
            activeCards.length = 0;
            cards.forEach(card => card.addEventListener('click', clickCard))
        }, 450)
    }
}

const buttonTextContent = () => {
    startReset.textContent = "Reset";
    startReset.classList.add('reset');
}

// stopwatch
const spanM = document.querySelector('span.minutes');
const spanS = document.querySelector('span.seconds');
const spanC = document.querySelector('span.centiseconds');

let idI;

const stopwatch = () => {
    setTimeout(function () {
        idI = setInterval(() => {
            const nowTime = new Date().getTime();
            const time = nowTime - startTime

            let minutes = Math.floor(time / (1000 * 60));
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            spanM.textContent = minutes;

            let seconds = Math.floor(time / 1000 % 60);
            seconds = seconds < 10 ? `0${seconds}` : seconds;
            spanS.textContent = seconds;

            let centiseconds = Math.floor(time / 10 % 100);
            centiseconds = centiseconds < 10 ? `0${centiseconds}` : centiseconds;
            spanC.textContent = centiseconds;
        }, 10)
    }, delay)
}

// Delay
const input = document.querySelector('.delay input');
const delayTime = document.querySelector('.delayTime');

function handleUpdate() {
    input.value = this.value;
    delay = input.value * 1000;
    delayTime.textContent = `${delay / 1000}s`
    startingScore = 1000 / (delay / 1500);
}

input.addEventListener('change', handleUpdate)
input.addEventListener('mousemove', handleUpdate)

//Player score
const playerScore = () => {
    let startingScore = 1000 / (delay / 1750);

    if (startingScore === Infinity) startingScore = 1500;
    else if (delay >= 5000) startingScore = 1000 / (delay / 3000);
    else if (delay >= 8000) startingScore = 1000 / (delay / 3500);
    const amountOfSeconds = (endTime - startTime) / 1000;
    const correctAnswersMultiplier = Math.sqrt(correctAnswers / incorrectAnswers)

    const endingScore = ((startingScore / amountOfSeconds) * correctAnswersMultiplier).toFixed(2);

    if (endingScore > 100) {
        alert(`Idziesz na rekord!!! Twój wynik to: ${endingScore}!`);
    } else if (endingScore > 75) {
        alert(`Świetnie Ci poszło! Twój wynik to: ${endingScore}!`);
    } else if (endingScore < 15) {
        alert(`Nie poszło najlepiej... Twój wynik to ${endingScore}`)
    } else alert(`Twój wynik z tej gry to: ${endingScore}!`);

    console.log(startingScore);
    console.log(amountOfSeconds);
    console.log(correctAnswers);
    console.log(incorrectAnswers);
    console.log(correctAnswersMultiplier);
    console.log(endingScore);
}

//End
startReset.addEventListener('click', startGame);
startReset.addEventListener('click', stopwatch);
startReset.addEventListener('click', buttonTextContent);

loadPage();