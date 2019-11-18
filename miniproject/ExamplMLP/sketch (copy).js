// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
//  9:00 pm 30/10/19
let nn;
let training_data = [{
    inputs: [0, 0],
    outputs: [0]
  },
  {
    inputs: [1, 1],
    outputs: [0]
  },
  {
    inputs: [0, 1],
    outputs: [1]
  },
  {
    inputs: [1, 0],
    outputs: [1]
  }
];
let network;
let start = true;
let inputs = 2;
let layers = 2;
let NoOfHidden = layers - 1;
let numHiddenNodes = 4;
let NoOfOutput = 1;
let Xlimit;
let Ylimit;
let offset = 250;
let correctness = 0;
let epoch = 0;

function createNetwork() {
  nn = new NeuralNetwork(2, numHiddenNodes, 1);
  nn.setLearningRate(0.01);
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
    let x = 5 * Xlimit;
    if (NoOfOutput == 1) {
      let y = 0;
      output[0] = new Neuron(x, y);
    } else {
      let y = map(i, 0, NoOfOutput - 1, -Ylimit, Ylimit);
      output[i] = new Neuron(x, y);
    }
  }

  for (let i = 0; i < layers; i++) {
    if (i == 0) {
      for (let j = 0; j < inputs; j++) {
        let x = map(i, 0, layers, Xlimit, 5 * Xlimit);
        let y = map(j, 0, inputs - 1, -Ylimit, Ylimit);
        let n = new Neuron(x, y);
        nodes[i][j] = n;
        network.addNeuron(n);
      }
    } else {
      for (let j = 0; j < hidden[i - 1]; j++) {
        let x = map(i, 0, layers, Xlimit, 5 * Xlimit);
        let y = map(j, 0, hidden[i - 1] - 1, -Ylimit, Ylimit);
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
  createCanvas(1000, 500);
  Xlimit = (width * 0.09);
  Ylimit = (height / 2) - 50;
  createNetwork();

  let startButton = select("#start");
  startButton.mousePressed(function() {
    start = !start;
  });

  let trainButton = select("#train");
  trainButton.mousePressed(function() {
    train(1);
  });

  let train10Button = select("#train10");
  train10Button.mousePressed(function() {
    train(10);
  });
  let resetButton = select("#reset");
  resetButton.mousePressed(createNetwork);

  let numHNButton_plus = select("#numHN+");
  numHNButton_plus.mousePressed(function() {
    if (numHiddenNodes + 1 < 10)
      numHiddenNodes++;
  });

  let numHNButton_minus = select("#numHN-");
  numHNButton_minus.mousePressed(function() {
    if (numHiddenNodes - 1 >= 2)
      numHiddenNodes--;
  });
}

function train(epoch) {
  start = false;
  console.log("Training" + epoch);
  //training_data
  for (let e = 0; e < epoch; e++) {
    for (let i = 0; i < 1000; i++) {
      let data = random(training_data);
      nn.train(data.inputs, data.outputs);
    }
  }
  start = true;
}

function getInputs() {
  let res = 10;
  let cols = (width / 2) / res;
  let rows = height / res;
  let inputs = [];
  let index = 0;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x1 = i / cols;
      let x2 = j / rows;
      inputs[index] = [x1, x2];
      index++;
    }
  }
  return inputs;
}

function displayPredict() {
  let res = 10;
  let cols = (width / 2) / res;
  let rows = height / res;
  let inputs = getInputs();
  noStroke();
  let index = 0;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // console.log(inputs[i]);
      let y = nn.predict(inputs[index]);
      index++;
      fill(y * 255);
      rect(i * res, j * res, res, res);
    }
  }
  // console.log(inputs);
  // noLoop();
}

function draw() {
  background(220);
  displayPredict();
  NoOfHidden = layers - 1;
  document.getElementById('numHiddenNodes').innerHTML = "No. of Hidden Nodes: " + numHiddenNodes;
  network.display();
  if (start) {
    network.update();
    if (frameCount % 60 == 0) {
      network.send(inputs);
    }
  } else {

  }
}
