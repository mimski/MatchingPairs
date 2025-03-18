let cards = [];
let cardTable = document.querySelector(".card-table");
let firstCard = null;
let secondCard = null;
let noFlipping = false;
let triesRemaining = 10;
let winCounter = null;
let counter = document.querySelector(".tries-remaining");

counter.textContent = triesRemaining;

fetch("./data/card_info.json")
    .then(response => response.json())
    .then((data) => {
        winCounter = data.length;
        cards = [...data, ...data];

        let suffledCards = shuffle();

        dealCards(suffledCards);
    })
    .catch((error) => {
        console.log("Error fetching card data: ", error);
    });

function shuffle() {
    let shuffledCardsArray = [...cards];
    let totalCards = shuffledCardsArray.length;
    let currentIndex = totalCards - 1;

    // Fisher-Yates (or Knuth) shuffle algorithm. Ensures that each possible permutation of
    // the array has an equal probability of occurring.
    for(currentIndex; currentIndex > 0; currentIndex--) {
        let randomCardIndex = Math.floor(Math.random() * (currentIndex + 1));
        [shuffledCardsArray[currentIndex], shuffledCardsArray[randomCardIndex]] = [shuffledCardsArray[randomCardIndex], shuffledCardsArray[currentIndex]];
    }

    return shuffledCardsArray;
}

function dealCards(cards) {
    console.log("welcome to the random card game");
    let fragment = document.createDocumentFragment();

    for(const card of cards) {
        let cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("data-name", card.name);

        let backCardDiv = document.createElement("div");
        backCardDiv.classList.add("back");

        let faceCardDiv = document.createElement("div");
        faceCardDiv.classList.add("face");

        let img = document.createElement("img");
        img.classList.add("face-image");
        img.src = `${card.image}.png`;

        faceCardDiv.appendChild(img);

        cardElement.append(faceCardDiv, backCardDiv);
        fragment.appendChild(cardElement);
    }

    cardTable.appendChild(fragment);

    let deck = document.querySelectorAll(".card");
    deck.forEach(card => {
        card.addEventListener("click", flipCard);
    });
}

function flipCard() {
    if(noFlipping) return;

    this.classList.add("flipped");
    if(this === firstCard) return;

    if(!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    noFlipping = true;
    checkForMatch();
}

function checkForMatch() {
    if(firstCard.dataset.name === secondCard.dataset.name) {
        matchCards();
    } else {
        unflipCards();
    }
}

function matchCards() {
    --winCounter;
    if(winCounter === 0) {
        setTimeout(() => {
            alert("YOU WIN. Please refresh the browser.");
            let confettiInterval = setInterval(createConfetti, 300);
            setTimeout(() => {
               clearInterval(confettiInterval);
            }, 5000);
        }, 1000);
    }
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    setCardBackground(firstCard, "greenyellow");
    setCardBackground(secondCard, "greenyellow");
    resetFlags();
}

function setCardBackground(card, color) {
    card.children[0].style.background = 'greenyellow';
}

function unflipCards() {
    setTimeout(() => {
        --triesRemaining;
        counter.textContent = triesRemaining;
        if(triesRemaining === 0) {
            alert("YOU LOST");
            showImageOverlay();
            return;
        }
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetFlags();
    }, 1000);
}

function resetFlags() {
    firstCard = null;
    secondCard = null;
    noFlipping = false;
}

function showImageOverlay() {
    let wrapper = document.createElement("div");
    wrapper.classList.add("image-overlay");
    let img = document.createElement("img");
    img.src = "./images/loser.jpg";
    wrapper.appendChild(img);
    document.body.appendChild(wrapper);

    requestAnimationFrame(() => {
        wrapper.style.opacity = 1;
    });
}

function createConfetti() {
    let confetti = document.createElement("div");
    confetti.classList.add("confetti");
    let randomX = Math.random() * window.innerWidth;
    confetti.style.left = `${randomX}px`;
    let duration = Math.random()*2 + 3;
    confetti.style.animationDuration = `${duration}s`;
    document.getElementsByClassName("celebration-wrapper")[0].appendChild(confetti);
    confetti.addEventListener("animationend", ()=> {
       confetti.remove();
    });
}
