// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
let nn;
let network;
let start = true;
let inputs = 2;
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

function setup() {
  createCanvas(640, 360);
  nn = new NeuralNetwork(2, 0, 1);
  // Create the Network object
  network = new Network(width / 2, height / 2);
  //difference of NoOfLayers(layers) and NoOfHidden cannot be greater than 1
  //Create Exception
  let layers = 2;

  let NoOfHidden = 2;
  let hidden = [];
  for (let i = 0; i < NoOfHidden; i++)
    hidden[i] = 3;

  let nodes = [];
  for (let i = 0; i < layers; i++)
    nodes[i] = [];

  let NoOfOutput = 1;
  let output = [];
  for (let i = 0; i < NoOfOutput; i++)
    output[i] = 0;

  //Change this output to accept multiple outputs
  output[0] = new Neuron(250, -50);
  //output[1] = new Neuron(250, 50);

  let weights = [];
  for (let i = 0; i < NoOfOutput; i++)
    weights[i] = 0;

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
  network.addNeuron(output[0]);
  //network.addNeuron(output[1]);
  for (let i = 0; i < layers; i++) {
    if (i == 0) {
      for (let j = 0; j < inputs; j++) {
        for (let k = 0; k < hidden[i]; k++) {
          let prev = nodes[i][j];
          let n = nodes[i + 1][k];
          network.connect(prev, n, random(0.0000001, 1));
        }
      }
    } else if (i == layers - 1) {
      for (let j = 0; j < hidden[i - 1]; j++) {
        let prev = nodes[i][j];
        network.connect(prev, output[0], random(0.0000001, 1));
        //network.connect(prev, output[1], random(0.0000001, 1));
      }
    } else {
      for (let j = 0; j < hidden[i - 1]; j++) {
        for (let k = 0; k < hidden[i]; k++) {
          let prev = nodes[i][j];
          let n = nodes[i + 1][k];
          network.connect(prev, n, random(0.0000001, 1));
        }
      }
    }
  }
  let startButton = select("#start");
  startButton.mousePressed(function() {
    start = !start;
  });
}

function draw() {
  background(220);
  for (let i = 0; i < 1000; i++) {
    let data = random(training_data);
    nn.train(data.inputs, data.outputs);
  }
  network.display();
  if (start) {
    network.update();
    if (frameCount % 30 == 0) {
      network.send(inputs);
    }
  } else {
    //reset();
  }
}
