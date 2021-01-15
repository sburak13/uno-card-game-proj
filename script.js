// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, background, ellipse, random, width, height,
   rect, line, text, rectMode, CENTER, mouseX, mouseY, frameRate, stroke, noFill,
   noStroke, keyCode, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, noLoop, fill, 
   collideRectCircle, textAlign, LEFT, collideRectRect, Clickable, color, textSize, 
   strokeWeight, Card, Deck, Player, preloadCard, preloadWildCard, loadImage, image,
   textStyle, BOLDITALIC, NORMAL, ITALIC, BOLD */

let randCompCard, randCompCardIndex, alertMessage, header_img, forgotUno,unoPressed,backgroundColor, screen, turn, winner, deck, user, computer, pile, topCard, userCanPlay, randCompCardWorks, tryCardCount;

function preload(){
  preloadCard();
  preloadWildCard();
  header_img = loadImage("https://cdn.glitch.com/91bc7955-201a-4761-80e9-6d5f5fd25dd1%2Funo_header.png?v=1596082982153");
}

function setup() {
  createCanvas(500, 600);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 90;
  
  screen = 0;
  turn = 0;

  deck = new Deck();
  user = new Player("user", deck);
  computer = new Player("computer", deck);

  pile = [];
  let firstPileCardIndex = deck.deck_array.length - 1;
  let firstPileCard = deck.deck_array[firstPileCardIndex];

  while (firstPileCard.value == "microsoft" || firstPileCard.value == "facebook" || firstPileCard.value == "google" || firstPileCard.value == "apple") {
    firstPileCardIndex = Math.floor(Math.random() * deck.deck_array.length);
    firstPileCard = deck.deck_array[firstPileCardIndex];
  }
  
  deck.deck_array.splice(firstPileCardIndex, 1);
  pile.push(firstPileCard);
  console.log(pile);

  userCanPlay = false;
  unoPressed = false;
  forgotUno = false;
  alertMessage = false;
}

function draw() {
  if (screen == 0) {
    startScreen();
  } else if (screen == 0.5) {
    instructScreen();
  } else if (screen == 1) {
    gameOn();
  } else if (screen == 2) {
    endScreen();
  }
}

// Runs before the game has started
function startScreen() {
  createCanvas(500, 600);
  background(backgroundColor);
  textAlign(CENTER);

  image(header_img, 20, 50, width - 40, 220);
  fill(0);
  stroke(100);
  textStyle(BOLDITALIC);
  text("Tech Companies Edition!", width / 2, 250);
  
  textStyle(ITALIC);
  text("By Samantha Burak and Sana Choudhary", width - 160, height - 30);
  
  textStyle(NORMAL);
    
  // Draw the start button
  var startButton = new Clickable();
  startButton.locate(width / 2 - startButton.width / 2, height / 2 + 40);
  adjustButton(startButton, "Play Game", "red");
  startButton.onPress = function() {
    this.color = "tomato";
    this.draw();
    screen = 1;
    layoutUserHand();
  };
  startButton.onHover = function() {
    startButton.color = "tomato";
    startButton.draw();
  };
  startButton.draw();
  
  // Draw the instructions button
  var instructButton = new Clickable();
  instructButton.locate(width / 2 - instructButton.width / 2, height / 2 + 120);
  adjustButton(instructButton, "Instructions", "red");
  
  instructButton.onPress = function() {
    this.color = "tomato";
    this.draw();
    screen = 0.5;
  };
  instructButton.onHover = function() {
    instructButton.color = "tomato";
    instructButton.draw();
  };
  instructButton.draw();
  
}

function instructScreen() {
  createCanvas(500, 600);
  background(backgroundColor);
  rules();
  
   // Draw the back button
  var backButton = new Clickable();
  backButton.locate(width / 2 - backButton.width / 2, height / 2 + 120);
  adjustButton(backButton, "Back", "red");
  
  backButton.onPress = function() {
    this.color = color(0, 50, 100);
    this.draw();
    screen = 0;
  };
  backButton.onHover = function() {
    backButton.color = "tomato";
    backButton.draw();
  };
  backButton.draw();
}

// Runs when the game is playing
function gameOn() {
  createCanvas(1200, 600);
  background(backgroundColor);
  
  // Show the user who's turn it is
  fill(0);
  textSize(25);
  textAlign(CENTER);
  text("Turns Played: " + turn, width / 2 , height - 50);

  // Draw top pile card
  topCard = pile[pile.length - 1];
  topCard.draw(width / 2 - topCard.card_width / 2, height / 2 - topCard.card_height / 2 - 45, true);
  
  // Draw alert message
  if ((topCard.value == "google" || topCard.value == "apple") && (turn % 2 == 0)) {
    var newColor;
    if (topCard.color == "crimson") {
      newColor = "red";
    } else if (topCard.color == "gold") {
      newColor = "yellow";
    } else if (topCard.color == "mediumseagreen") {
      newColor= "green";
    } else if (topCard.color == "dodgerblue") {
      newColor = "blue";
    }
    //alertMessage = true;
    if (alertMessage) {
      alert("Computer chose the color: " + newColor);
      alertMessage = false;
    }
  }

  // Draw the user's cards
  for (var i = 0; i < user.cards.length; i++) {
    user.cards[i].drawOnly(true);
  }
  
  // Draw the computer's cards
  for (var i = 0; i < computer.cards.length; i++) {
    var compCard = computer.cards[i];
    compCard.draw(i * 1.15 * compCard.card_width + compCard.card_width - 15, 50, false);
  }

  // Check if the user's cards were clicked
  if (userCanPlay) {
    for (var i = 0; i < user.cards.length; i++) {
      checkIfUserCardClicked(i);
    }
  }

  // Draw the draw button
  var drawButton = new Clickable();
  drawButton.locate(width - 200, 500);
  adjustButton(drawButton, "Draw Card", "white");
  
  drawButton.onPress = function() {
    if (userCanPlay && deck.deck_array.length > 0) {
      user.cards.push(deck.deck_array.pop());
      layoutUserHand();
      console.log(turn + ": User drew a card");
      
      turn++;
      
      userCanPlay = false;
      randCompCardWorks = false;
      tryCardCount = 0;
    } else if (userCanPlay) {
      console.log("No more cards in deck! Adding pile cards to deck");
      
      for (var i = 0; i < (pile.length - 1); i++) {
        console.log(pile.length);
        console.log(deck.deck_array.length);
        deck.deck_array.push(pile.pop());
      }
    }
    drawButton.color = 80;
    drawButton.draw();
  };
  drawButton.onHover = function() {
    drawButton.color = 80;
    drawButton.draw();
  }
  drawButton.draw();

  // Draw the uno button
  var unoButton = new Clickable();
  unoButton.locate(80, 500);
  adjustButton(unoButton, "Say Uno", "white");
  if (user.cards.length > 1) {
    unoPressed = false;
  }
  
  unoButton.onPress = function() {
    if (user.cards.length == 1) {
      unoPressed = true;
    } else {
      unoPressed = false;
    }
    unoButton.color = 80;
    unoButton.draw();
  };
  unoButton.onHover = function() {
    unoButton.color = 80;
    unoButton.draw();
  }
  unoButton.draw();
  
  fill(0);
  textSize(20);
  textAlign(LEFT);
  if (unoPressed && user.cards.length == 1) {
    text("User says: UNO!", 100, height / 2);
  }
  if (computer.cards.length == 1) {
    text("Computer says: UNO!", 100, 200);
  }
  if (forgotUno) {
    textAlign(CENTER);
    text("Draw a Card. Forgot to say Uno!", width / 2, height / 2 + 50);
    forgotUno = false;
  }
  textAlign(CENTER);

  // Manage who's turn it is
  textSize(35);
  if (turn % 2 == 0) {
    userCanPlay = true;
    fill("blue");
    text("YOUR TURN", width / 2, height - 90);
  } else {
    alertMessage = true;
    computerPlay();
    fill("red");
    text("COMPUTER'S TURN", width / 2, height - 90);
  }

  // Checks if someone won
  checkWin();
}

// Draw the user's hand
function layoutUserHand() {
  for (var i = 0; i < user.cards.length; i++) {
    var userCard = user.cards[i];
    userCard.setLocation(i * 1.15 * userCard.card_width + userCard.card_width - 15,350);
  }
}

// Checks if user clicked a card, if yes, call the Player method chooseCard
function checkIfUserCardClicked(i) {
  var cardChecked = user.cards[i];
  
  cardChecked.cardButton.onPress = function() {
    
    if (user.chooseCard(turn, cardChecked, i, topCard, pile)) {
      
      if (cardChecked.value == "microsoft") {
        computer.cards.push(deck.deck_array.pop());
        computer.cards.push(deck.deck_array.pop());
      } else if (cardChecked.value == "facebook") {
        turn++;
      } else if (cardChecked.value == "google") {
        computer.cards.push(deck.deck_array.pop());
        computer.cards.push(deck.deck_array.pop());
        computer.cards.push(deck.deck_array.pop());
        computer.cards.push(deck.deck_array.pop());
      }
      
      turn++;
      
      userCanPlay = false;
      randCompCardWorks = false;
      tryCardCount = 0;
      
      layoutUserHand();
    }
    
  };
}

// Manages the computer's turn
function computerPlay() {
  
// Keep trying random cards from computer's pile until one works
   if (randCompCardWorks == false) {
    randCompCardIndex = Math.floor(Math.random() * computer.cards.length);
    randCompCard = computer.cards[randCompCardIndex];
    randCompCardWorks = computer.chooseCard(turn, randCompCard, randCompCardIndex, topCard, pile);
     
    tryCardCount++;
  } else {
    
    if (randCompCard.value == "microsoft") {
      user.cards.push(deck.deck_array.pop());
      user.cards.push(deck.deck_array.pop());
    } else if (randCompCard.value == "facebook") {
      randCompCardWorks = false;
      turn++;
    } else if (randCompCard.value == "google") { // works?
      user.cards.push(deck.deck_array.pop());
      user.cards.push(deck.deck_array.pop());
      user.cards.push(deck.deck_array.pop());
      user.cards.push(deck.deck_array.pop());
    } else {
      console.log("Else statement!")
    }
    
    turn++;
    
    sleep(1000);
    
    layoutUserHand();
    
  }

  // If computer doesn't have any playable cards, have it draw a card
  if (tryCardCount > 15) {
    sleep(500);
    computer.cards.push(deck.deck_array.pop());
    console.log(turn + ": computer drew a card");
    turn++;
  }
  
}

// Checks if someone won
function checkWin() {
  if (user.cards.length == 0 && unoPressed == true) {
    winner = true;
    screen = 2;
  } else if (computer.cards.length == 0) {
    winner = false;
    screen = 2;
  } else if (user.cards.length == 0 && unoPressed == false) {
    forgotUno = true;
  }
}

// Runs when the game is over
function endScreen() {
  sleep(1000);
  createCanvas(500, 600);
  backgroundColor = 95;
  background(backgroundColor);

  textAlign(CENTER);
  textSize(32);
  fill(0);
  textStyle(BOLD);
  if (winner == true) {
    fill("green");
    text("GAME OVER. YOU WON!", width / 2, height / 2);
  } else {
    fill("red");
    text("GAME OVER. YOU LOST!", width / 2, height / 2);
  }
  textStyle(NORMAL);
}

// Manages the properties of the start button and draw button
function adjustButton(button, text, color_button) {
  button.width = 100;
  button.height = 50;
  button.color = color_button;
  button.cornerRadius = 10;
  button.strokeWeight = 2;
  button.stroke = color("black");
  button.text = text;
  button.textColor = color("black");
  button.textSize = 15;
  button.textFont = "Georgia";
}

function rules() {
  textSize(23);
  fill(0);
  textAlign(CENTER);
  text("Special Uno Cards: ", width / 2, 60);
  textSize(15);
  text("Microsoft Card — Draw 2", width / 2, 90);
  text("Facebook Card — Skip", width / 2, 110);
  text("Apple Card — Wild Card", width / 2, 130);
  text("Google Card — Wild Card Draw 4", width / 2, 150);
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}