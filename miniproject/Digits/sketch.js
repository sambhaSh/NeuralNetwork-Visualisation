let train_data= [];
let test_data= [];
let len = 784;
let finish = false;
let nn;

function preload() {
  let i = 0;
  let j = 0;
  let k = 0;
  let x = 0;

  Papa.parse('Digits/data/mnist_test.csv', {
  download:
    true,
    dynamicTyping:
    true,
    step:
    function(row) {
      if (x > 0 && x < 8002) {
        train_data[i] = row.data;
        i++;
      } else {
        test_data[k] = row.data;
        k++;
      }
      x++;
    }
    ,
    complete:
    function() {
      console.log("Finish Loading Data");
      finish = true;
    }
  }
  );
}

function setup() {
  let canvas = createCanvas(500, 500);
  canvas.parent('Digits-div');
  background(0);

  nn = new NeuralNetwork(784, 128, 10);
  let trainButton = select('#train');
  let epochCounter = 0;
  trainButton.mousePressed(function() {
    trainEpoch(train_data);
    epochCounter++;
    console.log("Epoch: " + epochCounter);
    document.getElementById('epoch').innerHTML = "Epoch: " + epochCounter;

  }
  );

  let testButton = select('#test');
  testButton.mousePressed(function() {
    let percent = testAll(test_data);
    console.log("Percent: " + nf(percent, 2, 2));
    document.getElementById('percent').innerHTML = "Testing Accuracy: " + nf(percent, 2, 2);
  }
  );

  let guessButton = select('#guess');
  guessButton.mousePressed(function() {
    let inputs = [];
    let img = get();
    img.resize(28, 28);
    img.loadPixels();
    for (let i = 0; i < len; i++) {
      let bright = img.pixels[i*4];
      inputs[i] = bright/255.0;
    }

    let guess = nn.predict(inputs);
    let m = max(guess);
    let classification = guess.indexOf(m);

    if (classification === "0") {
      document.getElementById('label').innerHTML = "Guessed: 0";
      console.log("zero");
    } else if (classification === 1) {
      document.getElementById('label').innerHTML = "Guessed: 1";
      console.log("one");
    } else if (classification === 2) {
      document.getElementById('label').innerHTML = "Guessed: 2";
      console.log("two");
    } else if (classification === 3) {
      document.getElementById('label').innerHTML = "Guessed: 3";
      console.log("three");
    } else if (classification === 4) {
      document.getElementById('label').innerHTML = "Guessed: 4";
      console.log("four");
    } else if (classification === 5) {
      document.getElementById('label').innerHTML = "Guessed: 5";
      console.log("five");
    } else if (classification === 6) {
      document.getElementById('label').innerHTML = "Guessed: 6";
      console.log("six");
    } else if (classification === 7) {
      document.getElementById('label').innerHTML = "Guessed: 7";
      console.log("seven");
    } else if (classification === 8) {
      document.getElementById('label').innerHTML = "Guessed: 8";
      console.log("eight");
    } else if (classification === 9) {
      document.getElementById('label').innerHTML = "Guessed: 9";
      console.log("nine");
    }
  }
  );

  let clearButton = select('#clear');
  clearButton.mousePressed(function() {
    background(0);
  }
  );
}

function draw() {
  strokeWeight(28);
  stroke(255);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}
