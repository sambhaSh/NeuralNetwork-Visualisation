class Perceptron{
  
  constructor(n, c){  //n is the no. of inputs + bias, c is the learning rate
    this.weights = new Array(n);
    for(let i = 0; i < this.weights.length; i++){
      this.weights[i] = random(-1, 1);
    }
    this.c = c;
  }
  
  getWeights(){
    return this.weights;
  }
  
  train(inputs, answer){
    let guess = this.feedforward(inputs);
    let error = answer - guess;
    for(let i = 0; i < this.weights.length; i++){
      this.weights[i] += error * inputs[i] * this.c;
    }
    //console.log(this.weights);
  }
  
  sign(sum){ //returns the sign of the sum
    if(sum > 0){  return 1;}
    else       {  return -1;}
  }
  
  feedforward(inputs){
    let sum = 0;
    for(let i = 0; i < this.weights.length; i++){
      sum += this.weights[i] * inputs[i];
    }
    return this.sign(sum);
  }
  
  guessY(x){
    return -(this.weights[2]/this.weights[1]) - (this.weights[0]/this.weights[1]) * x;
  }
  
  updateLearningRate(x){
    this.c = x;
  }
}
