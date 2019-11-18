class nodes {
  constructor(x, y) {
    this.weightsX = x;
    this.weightsY = y;
    //this.Wbias = bias;
  }

  showNodes() {
    stroke(0);
    strokeWeight(1);
    fill(255);
    ellipse(800, 150, 48, 48);
    fill(255);
    ellipse(800, 350, 48, 48);
    fill(255);
    ellipse(980, 250, 48, 48);
  }

  showWeights() {
    fill(0);
    noStroke();
    let x = nf(this.weightsX, 1, 3);
    let X = map(this.weightsX, -1, 1, 1, 10);
    let Y = map(this.weightsY, -1, 1, 1, 10);
    text(x, 880, 160);//text("hello",x,y);
    text("Input",780,100);
    text("X1", 750, 150);
    let y = nf(this.weightsY, 1, 3);
    text(y, 880, 340);
    text("X2",750,350);
    text("Output",960,200);
    text("Y",1020,250);
    stroke(0);
    strokeWeight(X);
    line(800, 150, 980, 250);
    strokeWeight(Y);
    line(800, 350, 980, 250);
  }

  getGuessValues(guess){
    this.guess = guess;
  }

  updateWeights(x, y) {
    this.weightsX = x;
    this.weightsY = y;
  }
}
