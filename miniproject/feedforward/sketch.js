let nn;
let network;
let start = true;
let inputs = 4;
let layers = 2;
let NoOfHidden = layers - 1;
let numHiddenNodes = 5;
let NoOfOutput = 2;

function createLabels() {
  let position = network.getLocation();
  translate(position.x, position.y);

  let hidden = [];
  for (let i = 0; i < layers - 1; i++)
    hidden[i] = numHiddenNodes;

  let nodes = [];
  for (let i = 0; i < layers; i++)
    nodes[i] = [];

  let output = [];
  for (let i = 0; i < NoOfOutput; i++) {
    let x = 250;
    if (NoOfOutput == 1) {
      let y = 0;
      text("Y" + i, x + 20, y);
    } else {
      let y = map(i, 0, NoOfOutput - 1, -120, 120);
      text("Y" + i, x + 20, y);
    }
  }

  for (let i = 0; i < layers; i++) {
    if (i == 0) {
      let xs = map(i, 0, layers, -280, 280);
      let ys = -120;
      if (inputs == 1) {
        text("X0", xs - 40, 0);
      } else {
        for (let j = 0; j < inputs; j++) {
          let y = map(j, 0, inputs - 1, -120, 120);
          text("X" + j, xs - 40, y);
        }
      }
      text("Input Layer", xs - 20, ys - 40);
    } else {
      let x = map(i, 0, layers, -280, 280);
      let y = -120;
      text("Hidden Layer", x - 20, y - 40);
    }
  }
  text("Output Layer", 240, -160);
}

function createNetwork() {
  // Create the Network object
  network = new Network(width / 2, height / 2);

  let hidden = [];
  for (let i = 0; i < layers - 1; i++)
    hidden[i] = numHiddenNodes;

  let nodes = [];
  for (let i = 0; i < layers; i++)
    nodes[i] = [];

  let output = [];
  for (let i = 0; i < NoOfOutput; i++) {
    let x = 250;
    if (NoOfOutput == 1) {
      let y = 0;
      output[0] = new Neuron(x, y);
    } else {
      let y = map(i, 0, NoOfOutput - 1, -120, 120);
      output[i] = new Neuron(x, y);
    }
  }

  for (let i = 0; i < layers; i++) {
    if (i == 0) {
      for (let j = 0; j < inputs; j++) {
        let x = map(i, 0, layers, -280, 280);
        let y = map(j, 0, inputs - 1, -120, 120);
        let n = new Neuron(x, y);
        nodes[i][j] = n;
        network.addNeuron(n);
      }
    } else {
      for (let j = 0; j < hidden[i - 1]; j++) {
        let x = map(i, 0, layers, -280, 280);
        let y = map(j, 0, hidden[i - 1] - 1, -120, 120);
        let n = new Neuron(x, y);
        nodes[i][j] = n;
        network.addNeuron(n);
      }
    }
  }
  for (let i = 0; i < NoOfOutput; i++) {
    network.addNeuron(output[i]);
  }

  for (let i = 0; i < layers; i++) {
    if (i == 0) {
      for (let j = 0; j < inputs; j++) {
        for (let k = 0; k < hidden[i]; k++) {
          let prev = nodes[i][j];
          let n = nodes[i + 1][k];
          network.connect(prev, n);
        }
      }
    } else if (i == layers - 1) {
      for (let j = 0; j < hidden[i - 1]; j++) {
        let prev = nodes[i][j];
        for (let i = 0; i < NoOfOutput; i++) {
          network.connect(prev, output[i]);
        }

      }
    } else {
      for (let j = 0; j < hidden[i - 1]; j++) {
        for (let k = 0; k < hidden[i]; k++) {
          let prev = nodes[i][j];
          let n = nodes[i + 1][k];
          network.connect(prev, n);
        }
      }
    }
  }
}

function setup() {
  let canvas = createCanvas(1050, 440, P2D);
  canvas.parent('sketch-div');
  createNetwork();

  let startButton = select("#start");
  startButton.mousePressed(function() {
    if (start == true) {
      document.getElementById('start').value = "Start";
    } else {
      document.getElementById('start').value = "Stop";
    }
    start = !start;
  });
  let resetButton = select("#reset");
  resetButton.mousePressed(createNetwork);
  let inputButton_plus = select("#input+");
  inputButton_plus.mousePressed(function() {
    if (start == false)
      if (inputs + 1 < 10)
        inputs++;
  });
  let inputButton_minus = select("#input-");
  inputButton_minus.mousePressed(function() {
    if (start == false)
      if (inputs - 1 >= 1)
        inputs--;
  });
  let outputButton_plus = select("#output+");
  outputButton_plus.mousePressed(function() {
    if (start == false) {
      if (NoOfOutput + 1 < 10)
        NoOfOutput++;
    }
  });
  let outputButton_minus = select("#output-");
  outputButton_minus.mousePressed(function() {
    if (start == false) {
      if (NoOfOutput - 1 >= 1)
        NoOfOutput--;
    }
  });
  let numHNButton_plus = select("#numHN+");
  numHNButton_plus.mousePressed(function() {
    if (start == false)
      if (numHiddenNodes + 1 < 10)
        numHiddenNodes++;
  });
  let numHNButton_minus = select("#numHN-");
  numHNButton_minus.mousePressed(function() {
    if (start == false)
      if (numHiddenNodes - 1 >= 2)
        numHiddenNodes--;
  });
  let numHLButton_plus = select("#numHL+");
  numHLButton_plus.mousePressed(function() {
    if (start == false)
      if (layers + 1 < 5) {
        layers++;
      }
  });
  let numHLButton_minus = select("#numHL-");
  numHLButton_minus.mousePressed(function() {
    if (start == false)
      if (layers - 1 > 1) {
        layers--;
      }
  });
}

function draw() {
  NoOfHidden = layers - 1;
  document.getElementById('numHiddenLayer').innerHTML = "No. of Hidden Layers: " + NoOfHidden;
  document.getElementById('numHiddenNodes').innerHTML = "No. of Hidden Nodes: " + numHiddenNodes;
  document.getElementById('numOutput').innerHTML = "No. of Output: " + NoOfOutput;
  document.getElementById('numInput').innerHTML = "No. of Input: " + inputs;
  background(220);
  network.display();
  createLabels();
  if (start) {
    network.update();
    if (frameCount % 60 == 0) {
      network.send(inputs);
    }
  } else {

  }
}
