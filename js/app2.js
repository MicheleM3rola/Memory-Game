let deckCard = document.querySelector(".deck");

let cards = [
  "fa-diamond",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-anchor",
  "fa-bolt",
  "fa-bolt",
  "fa-cube",
  "fa-cube",
  "fa-leaf",
  "fa-leaf",
  "fa-bicycle",
  "fa-bicycle",
  "fa-bomb",
  "fa-bomb"
];

function generateCards(card) {
  return `<li class="card" data-name=${card}><i class="fa ${card}"></i></li>`;
}

function gameInit() {
  let cardHtml = shuffle(cards).map(function(card) {
    return generateCards(card);
  });
  deckCard.innerHTML = cardHtml.join("");
}

gameInit();

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

let containerCards = document.querySelectorAll(".card");
let listCards = [...containerCards];

let openCard = [];

listCards.forEach(function(card) {
  card.addEventListener("click", displayCard);
});

function displayCard() {
  this.classList.add("open");
  this.classList.add("show");
  insertCard(this);
  disableListener(this);
}

function disableListener(card) {
  if (openCard.length > 2) {
  }
}

function insertCard(card) {
  openCard.push(card);
}
