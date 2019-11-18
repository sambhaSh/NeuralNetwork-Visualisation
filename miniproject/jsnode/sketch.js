let brain;
let training = new Array(100);
let ti = 0;
let count = 0;
let lr = 0.001;
let m; //slope
let b; //y-intercept
let start = false;
let reset = false;
let showData = true;
let weights = [];
let node;
let p1;
let p2;

function f(x) {
  return m * x + b;
}

function setup() {
  let canvas = createCanvas(1050, 440, P2D);
  canvas.parent('sketch-div');
  brain = new Perceptron(3, lr);
  //get weights from perceptron
  weights = brain.getWeights();
  node = new nodes(weights[0], weights[1]);  //initialize weight of input x & input y
  m = 0.45;
  b = 0.45;
  p1 = new Points();
  p2 = new Points();
  p1.setXY(-1, f(-1));
  p2.setXY(1, f(1));
  for (let i = 0; i < training.length; i++) {
    training[i] = new Points();
  }

  let startButton = select("#start");
  startButton.mousePressed(function() {
    start = true;
  }
  );

  let stopButton = select("#stop");
  stopButton.mousePressed(function() {
    start = false;
  }
  );

  let resetButton = select("#reset");
  resetButton.mousePressed(function() {
    brain = new Perceptron(3, lr);
    for (let i = 0; i < training.length; i++) {
      training[i] = new Points();
    }
  }
  );

  let trainButton = select("#train_data");
  trainButton.mousePressed(function() {
    showData = !showData;
  }
  );
}

function draw() {
  background(220);
  node.showNodes();  //display nodes of 2 input and 1 output;
  node.showWeights(); //show connection weights
  stroke(0);
  strokeWeight(1);
  noFill();
  rect(0, 0, 600-1, height-1);
  //dividing line
  p1.setXY(-1, f(-1));
  p2.setXY(1, f(1));
  for (let i in training) {
    training[i].show();
  }
  if (showData) {
    stroke(0);
    line(p1.mapX(), p1.mapY(), p2.mapX(), p2.mapY());
  }
  if (!start) {
    lr = document.getElementById('learningrate').value/100000;
    document.getElementById('learnRate').innerHTML = "Learning rate: " + lr;
    brain.updateLearningRate(lr);

    m = document.getElementById('slopeSlider').value/100;
    document.getElementById('slopeText').innerHTML = "Slope of the line: " + m;
    b = document.getElementById('interceptSlider').value/100;
    document.getElementById('interceptText').innerHTML = "y-intercept: " + b;
  } else {

    //perceptron line
    stroke(0, 0, 255);
    let p3 = new Points();
    let p4 = new Points();
    p3.setXY(-1, brain.guessY(-1));
    p4.setXY(1, brain.guessY(1));
    line(p3.mapX(), p3.mapY(), p4.mapX(), p4.mapY());

    for (let i in training) {
      training[i].show();
    }

    ti %= training.length;

    for (let i in training) {
      let inputs = new Array(training[i].x, training[i].y, training[i].bias);
      let target = training[i].answer;
      //brain.train(inputs, target);
      let guess = brain.feedforward(inputs);
      stroke(220);
      node.getGuessValues(guess);
      if (guess == target) {
        if (target > 0) {
          stroke(255, 0, 0);
        } else {
          stroke(0, 0, 255);
        }
      }
      noFill();
      ellipse(training[i].mapX(), training[i].mapY(), 14, 14);
    }

    let point = new Array(training[ti].x, training[ti].y, training[ti].bias);
    let target = training[ti].answer;
    brain.train(point, target);
    weights = brain.getWeights();
    node.updateWeights(weights[0], weights[1]);
    node.showNodes();  //display nodes of 2 input and 1 output;
    node.showWeights(); //show connection weights
    ti++;
    //count++;
  }
}
