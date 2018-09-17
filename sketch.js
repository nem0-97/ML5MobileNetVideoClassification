let mobilenet;
let cam;
let guess;

function setup(){
  createCanvas(640,650);
  background(0);
  video=createCapture(VIDEO);
  video.hide();
  //link mobilenet imageclassifier to video element
  mobilenet=ml5.imageClassifier('MobileNet',video,modelLoaded);
}

function modelLoaded(){
  console.log('Model has been loaded.');
  mobilenet.predict(prediction);
}

function prediction(err,result){
  if(err){
    console.log(err);
  }
  else{
    guess=result;
    //rerun predictions continously if no errors
    mobilenet.predict(prediction);
  }
}

function draw(){
  background(0);
  image(video,0,0);
  fill(255);
  textSize(32);
  if(guess){
    text(guess[0].className+': '+guess[0].probability,10,height-32);
    text(guess[1].className+': '+guess[1].probability,10,height-80);
    text(guess[2].className+': '+guess[2].probability,10,height-128);
  }
}
