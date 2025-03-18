let cards = [];

fetch("./data/card_info.json")
    .then(response => response.json())
    .then((data) => {
        cards = [...data, ...data];
    })
    .catch((error) => {
        console.log("Error fetching card data: ", error);
    });
