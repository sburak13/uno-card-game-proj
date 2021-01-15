/* global Clickable, color, CORNER, ellipseMode, ellipse, int, text, random, width, height, rect, fill, push, pop, ellipse, image, loadImage */

let red_skip, yellow_skip, green_skip, blue_skip, fb_img, red_draw2, yellow_draw2,green_draw2,blue_draw2, microsoft_img, back_img;
let destX = 1200 / 2 - 70 / 2;
let destY = 600 / 2 - 100 / 2 - 45;

function preloadCard() {
  red_skip = loadImage("https://cdn.glitch.com/91bc7955-201a-4761-80e9-6d5f5fd25dd1%2Fred_skip.png?v=1596030984111");
  yellow_skip = loadImage("https://cdn.glitch.com/91bc7955-201a-4761-80e9-6d5f5fd25dd1%2Fyellow_skip.png?v=1596032432322");
  green_skip = loadImage("https://cdn.glitch.com/91bc7955-201a-4761-80e9-6d5f5fd25dd1%2Fgreen_skip.png?v=1596032436021");
  blue_skip = loadImage("https://cdn.glitch.com/91bc7955-201a-4761-80e9-6d5f5fd25dd1%2Fblue_skip.png?v=1596032438869");
  fb_img = loadImage("https://cdn.glitch.com/91bc7955-201a-4761-80e9-6d5f5fd25dd1%2Ffacebook_logo.png?v=1596031128930");
  red_draw2 = loadImage("https://cdn.glitch.com/91bc7955-201a-4761-80e9-6d5f5fd25dd1%2Fred_draw2.png?v=1596035780479");
  yellow_draw2 = loadImage("https://cdn.glitch.com/91bc7955-201a-4761-80e9-6d5f5fd25dd1%2Fyellow_draw2.png?v=1596036109827");
  green_draw2 = loadImage("https://cdn.glitch.com/91bc7955-201a-4761-80e9-6d5f5fd25dd1%2Fgreen_draw2.png?v=1596036106563");
  blue_draw2 = loadImage("https://cdn.glitch.com/91bc7955-201a-4761-80e9-6d5f5fd25dd1%2Fblue_draw2.png?v=1596036097605");
  microsoft_img = loadImage("https://cdn.glitch.com/91bc7955-201a-4761-80e9-6d5f5fd25dd1%2Fmicrosoft_img.png?v=1596036479012");
  back_img = loadImage("https://cdn.glitch.com/91bc7955-201a-4761-80e9-6d5f5fd25dd1%2Fback_card.png?v=1596081951652");
}

class Card {
  constructor(color, value, visible) {
    this.x = 0;
    this.y = 0;
    this.color = color;
    this.value = value;
    this.card_width = 70;
    this.card_height = 100;
    this.cardButton = new Clickable();
    this.textSize = 50;
    this.textFont = "Bangers";
    this.image = null;
  }

  draw(x, y, visible) {
    this.setLocation(x, y);
    this.drawOnly(visible);    
  }
  
  setLocation(x, y) {
    this.x = x;
    this.y = y;
  }
  
  drawOnly(visible){
    let x = this.x;
    let y = this.y;
    this.cardButton.locate(x, y);
    
    this.adjustButton(this.cardButton, visible);
    
    this.cardButton.draw();
    
    if (visible) {
      
      push();
      fill("white");
      ellipse(x + this.card_width / 2, y + this.card_height / 2, this.card_width - 7, this.card_height - 10);
      fill(this.color);
      text(this.value, x + this.card_width / 2, y + this.card_height / 2);
      pop();

      if (this.value == "facebook") {
        if (this.color == "crimson") {
          this.image = red_skip;
        } else if (this.color == "gold") {
          this.image = yellow_skip;
        } else if (this.color == "mediumseagreen") {
          this.image = green_skip;
        } else if (this.color == "dodgerblue") {
          this.image = blue_skip;
        }
        image(this.image, x + 3, y + 2, this.card_width - 3, this.card_height - 3);
        image(fb_img, x + this.card_width - 30, y + 5, 25, 25);
      }

      if (this.value == "microsoft") {
        if (this.color == "crimson") {
          this.image = red_draw2;
        } else if (this.color == "gold") {
          this.image = yellow_draw2;
        } else if (this.color == "mediumseagreen") {
          this.image = green_draw2;
        } else if (this.color == "dodgerblue") {
          this.image = blue_draw2;
        }
        image(this.image, x + 3, y + 2, this.card_width - 3, this.card_height - 3);
        image(microsoft_img, x + this.card_width - 30, y + 5, 25, 25);
      }

    } else {
        this.image = back_img;
        image(this.image, x, y, this.card_width - 3, this.card_height - 3);
    }
    

  }

  isPlayable(topPileCard) {
    return this.match(topPileCard);
  }

  match(topPileCard) {
    if (this.color == topPileCard.color || this.value == topPileCard.value) {
      return true;
    } else {
      return false;
    }
  }
  
  adjustButton(button, visible) {
    button.width = this.card_width;
    button.height = this.card_height;
    if (!visible) {
      button.color = color("black");
      button.strokeWeight = 0;
    } else {
      button.color = this.color;
      button.strokeWeight = 5;
    }
    button.cornerRadius = 10;
    button.stroke = color("white");
    button.text = this.value;
    button.textColor = color("black");
    button.textSize = this.textSize;
    button.textFont = this.textFont;
  }
  
}
