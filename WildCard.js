/* global Clickable, color, CORNER, ellipseMode, ellipse, image, int, text, random, width, height, rect, fill, Card, text, loadImage, back_img */
let wildCard, draw4, apple, google;

function preloadWildCard() {
  wildCard = loadImage("https://cdn.glitch.com/91bc7955-201a-4761-80e9-6d5f5fd25dd1%2FwildCard.png?v=1596036911915");
  draw4 = loadImage("https://cdn.glitch.com/91bc7955-201a-4761-80e9-6d5f5fd25dd1%2Fdraw4.png?v=1596036908946");
  apple = loadImage("https://cdn.glitch.com/91bc7955-201a-4761-80e9-6d5f5fd25dd1%2Fapple_logo.png?v=1596078328626");
  google = loadImage("https://cdn.glitch.com/91bc7955-201a-4761-80e9-6d5f5fd25dd1%2Fgoogle_logo.jpg?v=1596078337472");
}

class WildCard extends Card {
  constructor(color, value, visible) {
    super(color, value, visible);
  }
  
  draw(x, y, visible) {
    this.setLocation(x, y);
    this.drawOnly(visible);
  }

  drawOnly(visible) {
    let x = this.x;
    let y = this.y;
    this.cardButton.locate(x, y);
    
    this.adjustButton(this.cardButton, visible);
    
    this.cardButton.draw();
    
    if (visible) {
      
      if (this.value == "apple") {
        this.image = wildCard;
        image(this.image, x + 3, y + 2, this.card_width - 3, this.card_height - 3);
        image(apple, x + this.card_width - 30, y + 5, 25, 25);
      }

      if (this.value == "google") {
        this.image = draw4;
        image(this.image, x + 3, y + 2, this.card_width - 3, this.card_height - 3);
        image(google, x + this.card_width - 30, y + 5, 25, 25);
      }
      
    } else {
      this.image = back_img;
      image(this.image, x, y, this.card_width - 3, this.card_height - 3);
    }
  }
  
  isPlayable(topPileCard) {
    return true;
  }

  adjustButton(button, visible) {
    button.width = this.card_width;
    button.height = this.card_height;
    if (!visible) {
      button.color = color("black");
    } else {
      button.color = this.color;
    }
    button.cornerRadius = 10;
    button.strokeWeight = 2;
    button.stroke = color("white");
    button.text = this.value;
    button.textColor = color("black");
    button.textSize = 15;
    button.textFont = "Georgia";
  }
}
