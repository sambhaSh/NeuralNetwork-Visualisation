
class Neuron {

  constructor(x, y, i) {
    this.index = i;
    this.location = createVector(x, y);
    this.r = 40;
  }

  // Draw Neuron as a circle
  display() {
    let X = mouseX - this.location.x;
    let Y = mouseY - this.location.y;
    // if(pow(X, 2) + pow(Y, 2) < pow(this.r, 2)){
    //   console.log(this.index);
    // }
    //console.log(this.location);
    stroke(0);
    //text("Input",100,200)''
    strokeWeight(1);
    fill(255);
    ellipse(this.location.x, this.location.y, this.r, this.r);
  }
}
