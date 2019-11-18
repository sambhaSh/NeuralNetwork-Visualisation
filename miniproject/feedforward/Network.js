
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
  connect(a, b) {
    let c = new Connection(a, b, random(1));
    a.addConnection(c);

    this.connections.push(c);
  }

  // Sending an input to the first Neuron
  // We should do something better to track multiple inputs
  send(inputs) {
    for (let i = 0; i < inputs; i++) {
      let input = random(0.5);
      this.neurons[i].feedforward(input);
    }
  }

  // Update the animation
  update() {
    this.connections.forEach(c => {
      c.update();
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
