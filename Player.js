/* global pop, fill, text, int, random, textSize, color, alertMessage */

class Player {
  constructor(id, deck) {
    this.id = id;
    this.cards = [];
    this.initializeCards(deck.deck_array);
  }

  initializeCards(array) {
    for (var i = 0; i < 7; i++) {
      /// Return and remove the last card in the deck array
      var card = array.pop();
      this.cards.push(card);
    }
  }

  chooseCard(turn, chosenCard, chosenCardIndex, topCardPile, pile) {
    if (chosenCard.isPlayable(topCardPile)) {
      // Remove card from player.cards
      this.cards.splice(chosenCardIndex, 1);
      
      if (chosenCard.value == "google" || chosenCard.value == "apple") {
        
        if (this.id == "user") {
          var answer = prompt("Please enter a color for your wildcard (red, yellow, green, blue).");
          if (answer == "red") {
            chosenCard.color = "crimson";
          } else if (answer == "yellow") {
            chosenCard.color = "gold";
          } else if (answer == "green") {
            chosenCard.color = "mediumseagreen";
          } else if (answer == "blue") {
            chosenCard.color = "dodgerblue";
          }
        } else if (this.id == "computer") {
          chosenCard.color = this.getMostCommonColorCards();
        }
        
        // alertMessage = false;
        
      }

      // Add card to pile
      pile.push(chosenCard);

      console.log(turn + ": " + chosenCard.color + " " + chosenCard.value + " played by " + this.id + ".");
      
      return true;
    } else {
      return false;
    }
  }

  getMostCommonColorCards() {
    var colorCounts = [0, 0, 0, 0];
    
    for (const card of this.cards) {
      switch (card.color) {
        case "crimson":
          colorCounts[0]++;
          break;
        case "gold":
          colorCounts[1]++;
          break;
        case "mediumseagreen":
          colorCounts[2]++;
          break;
        case "dodgerblue":
          colorCounts[3]++;
          break;
      }
    }
    
    var colorCountsMax = Math.max.apply(null, colorCounts);
    var colorCountsMaxIndex = colorCounts.indexOf(colorCountsMax);
   
    switch (colorCountsMaxIndex) {
      case 0:
        return "crimson";
      case 1:
        return "gold";
      case 2:
        return "mediumseagreen";
      case 3:
        return "dodgerblue";
      default:
        return "crimson";
    }
    
  }
  
}
