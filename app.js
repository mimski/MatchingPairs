let cards = [];

loadCards();

async function loadCards() {
  try {
      let response = await fetch("./data/card_info.json");
      let cardsArray = await reponse.json();
      console.log(cardsArray);
  } catch(error) {
      console.log(error);
  }
}
