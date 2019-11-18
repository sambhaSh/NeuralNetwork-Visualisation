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
let neuronHovered;
let neuronIndex = 0;
let reseted = false;
let network;
let start = false;
let isTraining = false;
let inputs = 2;
let layers = 2;
let NoOfHidden = layers - 1;
let numHiddenNodes = 4;
let NoOfOutput = 1;
let Xlimit;
let Ylimit;
let offset = 250;
let correct = 0;
let accuracy = 0;
let epochs = 0;
let res = 20;
let cols;
let rows;
let test_data = [];
let test_label = [];
let testSize;
let colIndex = 0;
let rowIndex = 0;
let index = 0;
let colors = [];
let WEIGHTS = [];

function createLabels() {
  let position = network.getLocation();
  translate(position.x, position.y);
  // stroke(0);
  textSize(12);
  fill(0);

  text("Input Layer", 90, -200);
  text("Hidden Layer", 270, -200);
  text("Output Layer", 450, -200);

  let ih = nn.getWeights();
  fill(255);
  stroke(0);
  text(nf(ih[0], 2, 2), 140, -120);
  text(nf(ih[1], 2, 2), 140, -80);
  text(nf(ih[2], 2, 2), 140, -40);
  text(nf(ih[3], 2, 2), 140, 0);
  text(nf(ih[4], 2, 2), 220, -100);
  text(nf(ih[5], 2, 2), 220, -20);
  text(nf(ih[6], 2, 2), 220, 60);
  text(nf(ih[7], 2, 2), 220, 140);

  let ho = nn.getWeights(1);
  text(nf(ho[0], 2, 2), 340, -100);
  text(nf(ho[1], 2, 2), 340, -40);
  text(nf(ho[2], 2, 2), 340, 30);
  text(nf(ho[3], 2, 2), 340, 90);
}

function createNetwork() {
  nn = new NeuralNetwork(2, numHiddenNodes, 1);
  nn.setLearningRate(0.1);
  // Create the Network object
  network = new Network(width / 2, height / 2);
  WEIGHTS = getWEIGHTS();
  let hidden = [];
  for (let i = 0; i < layers - 1; i++)
    hidden[i] = numHiddenNodes;

  let nodes = [];
  for (let i = 0; i < layers; i++)
    nodes[i] = [];

  //Add neurons to the network
  for (let i = 0; i < layers; i++) {
    if (i == 0) {
      for (let j = 0; j < inputs; j++) {
        let x = map(i, 0, layers, Xlimit, 5 * Xlimit);
        let y = map(j, 0, inputs - 1, -Ylimit + 100, Ylimit - 100);
        let n = new Neuron(x, y, neuronIndex++);
        stroke(0);
        strokeWeight(4);
        nodes[i][j] = n;
        network.addNeuron(n);
      }
    } else {
      for (let j = 0; j < hidden[i - 1]; j++) {
        let x = map(i, 0, layers, Xlimit, 5 * Xlimit);
        let y = map(j, 0, hidden[i - 1] - 1, -Ylimit, Ylimit);
        let n = new Neuron(x, y, neuronIndex++);
        nodes[i][j] = n;
        network.addNeuron(n);
      }
    }
  }
  //Output Layer
  let output = [];
  for (let i = 0; i < NoOfOutput; i++) {
    let x = 5 * Xlimit;
    if (NoOfOutput == 1) {
      let y = 0;
      output[0] = new Neuron(x, y, neuronIndex);
    } else {
      let y = map(i, 0, NoOfOutput - 1, -Ylimit, Ylimit);
      output[i] = new Neuron(x, y);
    }
  }

  for (let i = 0; i < NoOfOutput; i++) {
    network.addNeuron(output[i]);
  }

  let indx = 0;
  for (let i = 0; i < layers; i++) {
    if (i == 0) {
      // let indx = 0;
      for (let j = 0; j < inputs; j++) {
        for (let k = 0; k < hidden[i]; k++) {
          let prev = nodes[i][j];
          let n = nodes[i + 1][k];
          network.connect(prev, n, WEIGHTS[0][indx]);
          indx++;
        }
      }
    } else if (i == layers - 1) {
      let indx = 0;
      for (let j = 0; j < hidden[i - 1]; j++) {
        let prev = nodes[i][j];
        for (let i = 0; i < NoOfOutput; i++) {
          network.connect(prev, output[i], WEIGHTS[1][indx]);
          indx++;
        }
      }
    }
  }
}

function generateTestData() {
  let indx = 0;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x1 = i / cols;
      let x2 = j / rows;
      test_data[indx] = [x1, x2];
      if (x1 < 0.5 && x2 < 0.5 || x1 > 0.5 && x2 > 0.5) {
        test_label[indx] = 0;
      } else {
        test_label[indx] = 1;
      }
      indx++;
    }
  }
  testSize = test_data.length;
}

function getWEIGHTS() {
  let w = [];
  w.push(nn.getWeights());
  w.push(nn.getWeights(1));
  return w;
}

function setup() {
  let canvas = createCanvas(1000, 440);
  canvas.parent('sketch-div');
  cols = (width / 2) / res;
  rows = height / res;

  //Position of neural network
  Xlimit = (width * 0.09);
  Ylimit = (height / 2) - 50;

  createNetwork();

  let startButton = select("#start");
  startButton.mousePressed(function() {
    if (start == true) {
      document.getElementById('start').value = "Start";
    } else {
      document.getElementById('start').value = "Stop";
    }
    start = !start;
    isTraining = !isTraining;
  });

  let trainButton = select("#train");
  trainButton.mousePressed(function() {
    train(1);
  });

  let train10Button = select("#train100");
  train10Button.mousePressed(function() {
    train(100);
  });
  let resetButton = select("#reset");
  resetButton.mousePressed(function() {
    start = false;
    epochs = 0;
    correct = 0;
    accuracy = 0;
    neuronIndex = 0;
    createNetwork();
    resetBoard();
  });

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
  generateTestData();
  //initialize colors array with random values
  let indx = 0;
  for (let i = 0; i < cols; i++) {
    colors[i] = [];
    for (let j = 0; j < rows; j++) {
      colors[i][j] = test_label[indx];
      indx++;
    }
  }
}

function train(epoch = 1) {
  start = false;
  //let cc = 0;
  //console.log("Training " + epochs);
  //training_data
  for (let e = 0; e < epoch; e++) {
    for (var i = 0; i < 4; i++) {
      let data = training_data[i];
      nn.train(data.inputs, data.outputs);
      let w = getWEIGHTS();
      network.updateWeights(w);
    }
    //console.log(epochs);
    epochs++;
  }
  start = true;
}

function displayBoard() {
  noStroke();
  let indx = 0;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let br = colors[i][j] * 255;
      fill(br);
      rect(i * res, j * res, res - 1, res - 1);
      fill(255 - br);
      textSize(8);
      textAlign(CENTER, CENTER);
      text(nf(colors[i][j], 1, 2), i * res + res / 2, j * res + res / 2)
      // text(nf(test_label[indx], 1, 2), i * res + res / 2, j * res + res / 2)
      indx++;
    }
  }
}

function resetBoard() {
  for (let i = 0; i < cols; i++) {
    colors[i] = [];
    for (let j = 0; j < rows; j++) {
      colors[i][j] = random(1);
    }
  }
  reseted = false;
}

function draw() {
  NoOfHidden = layers - 1;
  document.getElementById('numHiddenNodes').innerHTML = "No. of Hidden Nodes: " + numHiddenNodes;
  document.getElementById('epochID').innerHTML = "Epoch: " + epochs;
  let ele = document.getElementsByName('activation');
  let activation;
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked)
      activation = ele[i].value;
  }
  if (activation == "tanh") {
    nn.setActivationFunction(tanh);
  } else {
    nn.setActivationFunction(sigmoid);
  }

  background(220);
  frameRate(60);
  index = index % testSize;
  colIndex = colIndex % cols;
  rowIndex = rowIndex % rows;

  noStroke();
  let y = nn.predict(test_data[index]);
  let x1 = test_data[index][0];
  let x2 = test_data[index][1];
  textSize(10);
  stroke(0);
  fill(255);
  text("X1 = " + nf(x1, 2, 2), 540, 145);
  text("X2 = " + nf(x2, 2, 2), 540, 280);
  text("Y = " + nf(y, 2, 2), 950, 180);
  if (start) {
    colors[colIndex][rowIndex] = y;
    rect(colIndex * res, rowIndex * res, res - 1, res - 1);
    noFill();
    stroke(0);
    rect(colIndex * res, rowIndex * res, res, res);
    train();
    if (rowIndex == rows - 1) {
      colIndex++;
    }
    rowIndex++;
    index++;
  }
  displayBoard();
  network.display();
  createLabels();
}
