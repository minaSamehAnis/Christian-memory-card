const cards = document.querySelectorAll(".memory-card");

let tapsDiv = document.getElementById("taps")
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0;
let taps = 0;
let timerElement = document.getElementById('timer');
let timeElapsed = 0;
let timer;
let isTimerStarted = false;



function flipCard(){
    if (!isTimerStarted) {
        startTimer();
        isTimerStarted = true;
    }

    if (lockBoard)return;
    if (this === firstCard) return;

    

    this.classList.toggle("flip");
    taps++;
    tapsDiv.innerHTML = `taps : ${taps}`
    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
        hasFlippedCard = false;
        secondCard = this;
        checkForMatch();

    
}

function checkForMatch(){
    let isMatch = firstCard.dataset.saint === secondCard.dataset.saint;

    isMatch ? disableCards() : unflipCards();
    if (matchedPairs == 6){
        setTimeout(() => {
            win()
        }, 2000);
        
    }
    
}
function disableCards(){
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    
    matchedPairs++;
    


    resetBoard();
    
    
}

function startTimer() {
    timer = setInterval(() => {
        timeElapsed++;
        timerElement.textContent = `Time: ${timeElapsed}s`;
    }, 1000);
}


function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 1000);
    
}

function win(){
    tryAgain = confirm("Congratulations! You've won the game! Do you want to play again?");
    if(tryAgain){
        stopTimer()
        location.reload(true)
    };
    
}
function stopTimer() {
    clearInterval(timer);  // Stops the timer
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard , secondCard] = [null, null];
}

(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener("click" , flipCard));


