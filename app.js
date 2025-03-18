let cards = [];
let cardTable = document.querySelector(".card-table");

fetch("./data/card_info.json")
    .then(response => response.json())
    .then((data) => {
        cards = [...data, ...data];

        dealCards(cards);
    })
    .catch((error) => {
        console.log("Error fetching card data: ", error);
    });

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
    this.classList.add("flipped");
}
