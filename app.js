let cards = [];
let cardTable = document.querySelector(".card-table");
let firstCard = null;
let secondCard = null;
let noFlipping = false;

fetch("./data/card_info.json")
    .then(response => response.json())
    .then((data) => {
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
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    setCardBackground(firstCard, "greenyellow");
    setCardBackground(secondCard, "greenyellow");
}

function setCardBackground(card, color) {
    card.children[0].style.background = 'greenyellow';
}

function unflipCards() {
    setTimeout(() => {
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
