
class Connection {

  constructor(from, to, w) {
    this.weight = w;
    this.a = from;
    this.b = to;
    this.output = 0;
    this.sending = false;
    this.sender = this.a.location.copy(); // Start animation at Neuron A
  }

  // The Connection is active
  feedforward(val) {
    this.output = val * this.weight; // Compute output
    this.sending = true; // Turn on sending
    this.sender = this.a.location.copy(); // Start animation at Neuron A
  }

  // Update traveling sender
  update() {
    if (this.sending) {
      // Use a simple interpolation
      this.sender.x = lerp(this.sender.x, this.b.location.x, 0.1);
      this.sender.y = lerp(this.sender.y, this.b.location.y, 0.1);
      let d = p5.Vector.dist(this.sender, this.b.location);
      // If we've reached the end
      if (d < 1) {
        // Pass along the output!
        this.b.feedforward(this.output);
        this.sending = false;
      }
    }
  }

  // Drawn as a line
  display() {
    fill(255);
    stroke(0);

    strokeWeight(this.weight * 4);
    line(this.a.location.x, this.a.location.y, this.b.location.x, this.b.location.y);
    if (this.sending) {
      fill(0, 150);
      strokeWeight(1);
      let size = this.weight * 24;
      ellipse(this.sender.x, this.sender.y, size, size);
    }
  }
}
