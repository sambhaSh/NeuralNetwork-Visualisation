function trainEpoch(training) {
  shuffle(training, true);
  let progress = 0;
  console.log("Training----");
  for (let i = 0; i < training.length; i++) {
    let data = getData(training[i]);
    let inputs = data.map(x => x/255);
    let label = training[i][0];
    let targets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    targets[label] = 1;
    nn.train(inputs, targets);
    getProgress(progress, training.length);
    progress++;
  }
  //console.log("Train Button pressed");
}

function getProgress(n, total) {
  let p = n/(total-1);
  if (p == 0.25) {
    document.getElementById('progess').innerHTML = "Progress: 25% completed";
    console.log("25%----");
  } else if (p == 0.5) {
    document.getElementById('progess').innerHTML = "Progress: 50% completed";
    console.log("50%----");
  } else if (p == 0.75) {
    document.getElementById('progess').innerHTML = "Progress: 75% completed";
    console.log("75%----");
  } else if (p == 1) {
    document.getElementById('progess').innerHTML = "Progress: Training Complete";

    console.log("Training Complete");
  }
}

function getData(dataset) {
  let data = [];
  for (let i = 1; i < 785; i++) {
    data[i-1] = dataset[i];
  }
  return data;
}

function testAll(testing) {
  shuffle(testing,true);
  let correct = 0;
  for (let i = 0; i < testing.length; i++) {
    let data = getData(testing[i]);
    let inputs = data.map(x => x/255);
    let label = testing[i][0];
    let guess = nn.predict(inputs);
    let m = max(guess);
    let classification = guess.indexOf(m);

    if (classification == label) {
      correct++;
    }
  }

  let percent = (correct/testing.length) * 100;
  console.log("Test Button pressed");
  return percent;
}
