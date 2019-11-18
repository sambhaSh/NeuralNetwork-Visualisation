
class Neuron {

  constructor(x, y) {
    this.location = createVector(x, y);
    this.connections = [];
    this.r = 32;
    this.sum = 0;
  }

  // Add a Connection
  addConnection(c) {
    this.connections.push(c);
  }

  // Receive an input
  feedforward(input) {
    // Accumulate it
    this.sum += input;
    // Activate it?
    if (this.sum > 1) {
      this.fire();
      this.sum = 0; // Reset the sum to 0 if it fires
    }
  }

  // The Neuron fires
  fire() {
    this.r = 64; // It suddenly is bigger

    // We send the output through all connections
    this.connections.forEach(c => {
      c.feedforward(this.sum);
    });
  }

  // Draw Neuron as a circle
  display() {
    stroke(0);
    strokeWeight(1);
    fill(0);
    let b = map(this.sum, 0, 1, 255, 0);
    fill(b);
    ellipse(this.location.x, this.location.y, this.r, this.r);

    // Draw all its connections
    this.r = lerp(this.r, 32, 0.1);
  }
}
