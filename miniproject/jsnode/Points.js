class Points {
  
  constructor() {
    this.x = random(-1, 1);
    this.y = random(-1, 1);
    this.bias = 1;
    let yLine = f(this.x);
    if (this.y > yLine) {
      this.answer = 1;
    } else {
      this.answer = -1;
    }
  }

  setXY(x, y) {
    this.x = x;
    this.y = y;
  }

  mapX() {
    return map(this.x, -1, 1, 0, 600);
  }

  mapY() {
    return map(this.y, -1, 1, height, 0);
  }

  show() {
    noStroke();
    if (this.answer == -1) {
      fill(0, 0, 255);
    } else {
      fill(255, 0, 0);
    }
    ellipse(this.mapX(), this.mapY(), 8, 8);
  }
}
