# Memory Game Project

## Table of Contents

- [Instructions](#instructions)
- [Contributing](#contributing)
- [Dependencies](#Dependencies)

* [My code Explained](#My-code-Explained)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

## Dependencies

- [Font Awesome](https://fontawesome.com/)
- [Google Fonts](https://fonts.google.com/)

# My-code-Explained

### The javascript side.

The way that I structured my game is a little bit complex, because I used a lot of functions and nested Function to get The Final result.

I started creating the cards Programmatically.

I created an array and I put inside all the icon's classes, after that I create a function **generateCards** to generate the **li** with the icons in it and,
I used another function **gameInit** where I maped through the cards array to create a new array generatic the new cards with js shuffling them at the same time using the **Shuffle Function** provided from **Udacity** and at the end appending all the cards to the **ul .deck**

### Code Example

```javascript
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
```

### Shuffle function (provided by Udacity)

```javascript
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
```

Generating cards programmatically you will be able to slim your **HTML** code deleting all the 16 **li**.

After that you are good to go to start to add the functionality to the game.

To Understand the code and what I was doing, I used a lot of comments, to not get lost.

I started creating **variables** to get access to the **DOM** and to the list of cards.

```javascript
let containerCard = document.querySelectorAll(".card");
let listCard = [...containerCard];
```

After I started to think how to flip the cards, fliping cards is an **event** so I took the array cards I looped through it with the **forEach** methond and I add the click event listener with and anonimous function.

Before to add the fliping card method I declared that whenever the cards have this particular class, **.open .show .match** if I click the second time on the same card nothing will happen, and after that I said whenever I click on a card add this particular class, in my case **.open and .show** and send the card to an empty array that I called **boxOpenCard**.

```javascript
listCard.forEach(function(card) {
  card.addEventListener("click", function(e) {
    if (
      !card.classList.contains("open") &&
      !card.classList.contains("show") &&
      !card.classList.contains("match")
    ) {
      card.classList.add("open", "show");
      boxOpenCard.push(card);
      if (boxOpenCard.length === 2) {
        checkMatch();
      }
    }
  });
});

function insertCard(cards) {
  boxOpenCard.push(cards);
  boxOpenCard.splice(2, 1);
}
```

As you can se there is another **if** that I added later on, basically says if the array has 2 cards call the **checkMatch** function.

**checkMatch** function I think is the most important function of the game because it checks if the 2 cards in the array have the same symbol and create the match sending the cards in another array called **boxMatchCard** that I will use later on for the pop up Modal.

```javascript
function checkMatch() {
  disableClicks();
  if (boxOpenCard[0].dataset.name === boxOpenCard[1].dataset.name) {
    let card1 = boxOpenCard[0];
    let card2 = boxOpenCard[1];
    card1.classList.add("match");
    card1.classList.remove("open", "show");
    card2.classList.add("match");
    card2.classList.remove("open", "show");

    insertMatch(card1, card2);
    moveCounter();
    setTimeout(clearArray, 1000);
    setTimeout(enableClicks, 1000);
  } else {
    setTimeout(removeClass, 700);
    moveCounter();
    setTimeout(enableClicks, 700);
  }
}
```

**checkMatch** function is a big nested function where basically you check if the cards in the array match, if so you remove the other classes and add the new class match that color the card green after you send it to **boxMatchCard** calling the **insertMatch** function

```javascript
function insertMatch(x, y) {
  boxMatchCard.push(x, y);
}
```

you mouve the counter that is a feature of the game,

```javascript
let moves = 0;

function moveCounter() {
  moves++;
  counterMoves.innerHTML = moves;
  scoreStars();
}
```

you clear the array with the **clearArray** function

```javascript
function clearArray() {
  boxOpenCard = [];
  if (boxMatchCard.length === 16) {
    /*scoreStars();*/
    displayModal();
  }

  return boxOpenCard;
}
```

and enable the click with the **enableClick** function

```javascript
function enableClicks() {
  document.body.style.pointerEvents = "auto";
}
```

you want to disable the event listener when the function is checking if there is a match, otherwise you will be able to open 3/4 cards at the same time where two of them will go to the array to be checked and the other 2 will be fliped over without a match.

```javascript
function disableClicks() {
  document.body.style.pointerEvents = "none";
}
```

If the cards don't match, you remove the class **.open and .show** fliping the card back, you will move the counter anyway and obviously again you will enable the click.

```javascript
function removeClass() {
  listCard.forEach(card => {
    card.classList.remove("open", "show");
    clearArray();
  });
}
```

## Game Feature

### Restart Button

```javascript
function restart() {
  listCard.forEach(card => {
    card.classList.remove("open", "show", "match");
  });

  boxOpenCard = [];
  boxMatchCard = [];
  moves = 0;
  counterMoves.innerHTML = moves;
  for (i = 0; i < 3; i++) {
    starsConteiner[i].style.visibility = "visible";
  }
  clearInterval(timer);
  secCounter = 0;
  insertTimer.innerHTML = convertSeconds(secCounter);
  location.reload();
}

restartButton.addEventListener("click", restart);
```

### Counter

```Javascript
let moves = 0;

function moveCounter() {
  moves++;
  counterMoves.innerHTML = moves;
  scoreStars();
}
```

### Timer

```javascript
let insertTimer = document.querySelector("#time");
let startTimer = document.querySelector(".start");

let secCounter = 0;
let timer;
function convertSeconds(s) {
  let min = Math.floor(s / 60);
  let sec = s % 60;
  return min + ":" + sec;
}

function timerFun() {
  timer = setInterval(function() {
    secCounter++;
    insertTimer.innerHTML = convertSeconds(secCounter);
  }, 1000);
}

startTimer.addEventListener("click", timerFun);
```

### Score Point

In this case I used the same function twice on differents classes.

The first score Point is in the game section where you have the stars that based on your moves they will decrese or stay the same if you have a good memory.
The second score point is showed in the pop up modal.

I did like this because using the same class which was the same array for two different lists the score point was updating just 1 of them.

Probably there is another way to do it, but that's what I came up with.

```javascript
let stars = document.querySelectorAll(".stars li");
let resetStars = document.querySelectorAll("ul.stars");

let starsConteiner = [...stars];

function scoreStars() {
  if (moves > 8 && moves < 12) {
    for (i = 0; i < 3; i++) {
      if (i > 2) {
        starsConteiner[i].style.visibility = "collapse";
      }
    }
  } else if (moves > 12 && moves <= 17) {
    for (i = 0; i < 3; i++) {
      if (i > 1) {
        starsConteiner[i].style.visibility = "collapse";
      }
    }
  } else if (moves > 17) {
    for (i = 0; i < 3; i++) {
      if (i > 0) {
        starsConteiner[i].style.visibility = "collapse";
      }
    }
  }
}
```

### Modal

Modal that pop up at the end when all the cards are matched.

```javascript
let modal = document.querySelector(".modal");
let closeButton = document.querySelector(".close-button");
let message = document.querySelector(".message");
let btnPlayAgain = document.querySelector("#btn-play");

function closeModal() {
  modal.classList.remove("show-modal");
  restart();
}

function displayModal() {
  modal.classList.add("show-modal");

  let congMex = ` Congratulations You Won!! </br>
  
   </br>
   Moves : ${moves}
   </br>
   Times : ${convertSeconds(secCounter)} sec`;

  clearInterval(timer);
  modalScoreStars();

  return (message.innerHTML = congMex);
}

closeButton.addEventListener("click", closeModal);
btnPlayAgain.addEventListener("click", closeModal);
```

```html
<div class="modal">
  <div class="modal-content">
    <span class="close-button">&times;</span>

    <p class="message"></p>
    <ul class="modal-stars">
      <li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>
    </ul>

    <button id="btn-play">Play Again</button>
  </div>
</div>
```

Thath's it, this is all my hard work, it took me a good week and half, good challange,
I think I learned a lot from that.
Suggestion to complete this project, don't worry about how you are doing it, in code there are many way to do the same thing, yours probably would be the messy one but with the time and more experience you will be able to write clean code with not repetition.
