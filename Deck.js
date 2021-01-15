/* global Card, WildCard, color */

class Deck {
  constructor() {
    this.deck_array = [];
    this.populate();
    this.shuffle();
  }

  populate() {
    var values = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
    var values_special = ["microsoft", "microsoft", "facebook", "facebook"];

    var colors = ["crimson", "gold", "mediumseagreen", "dodgerblue"];
    var wildValues = ["google", "apple"];

    for (const color of colors) {
      for (const value of values) {
        this.deck_array.push(new Card(color, value));
      }
    }

    for (const color of colors) {
      for (const value_special of values_special) {
        var newCard = new Card(color, value_special);
        newCard.textSize = 15;
        newCard.textFont = "Georgia";

        this.deck_array.push(newCard);
      }
    }

    for (var i = 0; i < 4; i++) {
      for (const wildValue of wildValues) {
        this.deck_array.push(new WildCard("white", wildValue));
      }
    }
  }

  // For 1000 turns, switch the values of two random cards
  shuffle() {
    for (var i = 0; i < 1000; i++) {
      var location1 = Math.floor(Math.random() * this.deck_array.length);
      var location2 = Math.floor(Math.random() * this.deck_array.length);
      var tmp = this.deck_array[location1];

      this.deck_array[location1] = this.deck_array[location2];
      this.deck_array[location2] = tmp;
    }
  }
}
