# Matching Pairs

## 📜 Description
**Matching Pairs** is a fun and interactive memory game built using pure JavaScript, HTML, and CSS. The game challenges players to match pairs of cards while keeping track of failed attempts. The game utilizes the Fisher-Yates shuffle algorithm for randomizing the cards, making each playthrough unique.

## ✨ Features
- **Dynamic Card Shuffling**: Cards are shuffled at the beginning of the game using the Fisher-Yates algorithm.
- **Flip Animation**: Smooth card flipping animations for an engaging user experience.
- **Win/Loss Conditions**: Players either win by matching all pairs or lose when they run out of attempts.
- **Confetti Celebration**: Upon winning, a confetti animation is triggered.
- **Overlay Display on Loss**: A losing screen appears when attempts reach zero.

## 🎯 How to Play
1. Click on a card to flip it.
2. Flip another card to find its matching pair.
3. If the cards match, they remain face-up; otherwise, they flip back.
4. The game continues until all pairs are matched or the player runs out of attempts.
5. If all pairs are matched, the player wins with a confetti celebration.
6. If the player fails within 10 attempts, a losing overlay appears.

## 🛠️ Technologies Used
- **HTML5** – Structure of the game.
- **CSS3** – Styling and animations.
- **JavaScript** – Game logic, shuffling algorithm, and event handling.

## 💻 Installation & Usage
1. Clone or download this repository.
2. Ensure that the following files are included in the project directory:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `data/card_info.json`
   - `images/` (containing images for the cards and cover)
3. Open `index.html` in a browser to play the game.
