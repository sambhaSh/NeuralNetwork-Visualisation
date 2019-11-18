// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Network {

  constructor(x, y) {
    this.location = createVector(x, y);
    this.neurons = [];
    this.connections = [];
  }

  // We can add a Neuron
  addNeuron(n) {
    this.neurons.push(n);
  }
  
  getLocation(){
    return this.location;
  }
  // We can connection two Neurons
  connect(a, b, w) {
    let c = new Connection(a, b, w);
    this.connections.push(c);
  }

  updateWeights(w) {
    let i = 0;
    let j = 0;
    let d = 0;
    this.connections.forEach(c => {
      if(d < numHiddenNodes*2){
        c.update(w[0][i]);
        i++;
      }else{
        c.update(w[1][j]);
        j++;
      }
      d++;
    });
  }

  // We can draw the network
  display() {
    push();
    translate(this.location.x, this.location.y);
    this.neurons.forEach(n => {
      n.display();
    });
    this.connections.forEach(c => {
      c.display();
    });
    pop();
  }
}
