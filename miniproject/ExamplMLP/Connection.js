
class Connection {

  constructor(from, to, w) {
    this.weight = w;
    this.a = from;
    this.b = to;
    this.sender = this.a.location.copy(); // Start animation at Neuron A
  }

  update(w){
    this.weight = w;
    //console.log(w);
  }
  // Drawn as a line
  display() {
    //console.log(this.weight);
    stroke(0);
    // text(this.weight, )
    strokeWeight(this.weight * 2);
    line(this.a.location.x, this.a.location.y, this.b.location.x, this.b.location.y);
    noFill();
    //fill(0, 150);
  }
}
