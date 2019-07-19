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

[Font Awesome](https://fontawesome.com/)
[Google Fonts](https://fonts.google.com/)

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
