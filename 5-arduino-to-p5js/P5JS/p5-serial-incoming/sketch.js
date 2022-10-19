let port;
let connectBtn;
let preVal = 0; // declare potentiometer base value to stop the sketch flickering
let btnPreVal = 0; // declare button base value to stop the sketch flickering
let buttonPushCounter = 0; // counter for the number of button presses
let lastButtonState = 0; // previous state of the button

let fillCol; // colour variable -> array
let bgFillCol; // background colour variable -> array
let c; // used as the colour counter for circle
let s; // used as the colour counter for square
let t; // used the colour counter for triangle
let bg; // used the colour counter for background colour

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  rectMode(CENTER);
  textAlign(CENTER);
  noStroke();

  port = createSerial();

  // testing fill colors output
  fillCol = [color('#c0392b'), color('#e67e22'), color('#f1c40f'), color('#2ecc71'), color('#3498db'), color('#8e44ad')]; // an array of fill colours
  bgFillCol = [color('#e6f3ff'), color('#cce6ff'), color('#b3daff'), color('#80c1ff'), color('#339cff'), color('#004280')]; // an array of background colours
  c = Math.round(random(0, 5)); // random circle colour
  s = Math.round(random(0, 5)); // random square colour
  t = Math.round(random(0, 5)); // random triangle colour
  bg = Math.round(random(0, 5)); // random background colour

  // initial setup button
  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(20, 20);
  connectBtn.style('background-color', color(bgFillCol[bg]));
  connectBtn.style('fill-color', '255');
  connectBtn.style('font-size', '20px');
  connectBtn.mousePressed(connectBtnClick);
}

function draw() {
  background(color(bgFillCol[bg])); // random value from the fillCol array

  // reads in complete lines and prints them at the
  // bottom of the canvas
  let inputString = port.readUntil("\n"); // declare input variable as the arduino serial output

  // potentiometer input
  let val = inputString.split(':')[0] || preVal; // splitting the input string and extracting the potentiometer value
  // change the value of preVal if val is communicated
  // this ensures that the sketch does not flicker
    if (val) {
      preVal = val;
    }

    // button input
    let btnVal = inputString.split(':')[1] || btnPreVal; // splitting the input string and extracting the button value
    // change the value of preBtnVal if  btnVal is received
    // this ensures that the sketch does not flicker
    if (btnVal) {
      btnPreVal = btnVal;
    }

    // when the button is pressed change the state of shape
    if (btnVal != lastButtonState) {
      // if the state has changed, incremement the counter
      if (btnVal == 1) {
        buttonPushCounter++;
      }
  }

    // print out the potentiometer, button presses and total number of button presses
    console.log('Potentiometer:', val, '//', 'Button press:', btnVal, '//', 'Button counter:', buttonPushCounter);

  // drawing different shapes based on the buttonPushCounter
  if (buttonPushCounter == 0) {
    // intro text
    textSize(20);
    fill(0);
    text('Connect the Arduino and click the button', width/2, height/2);
  } else if (buttonPushCounter == 1) {
    // circle
    fill(color(fillCol[c])); // random value from the fillCol array
    ellipse(width/2,height/2,val);
  } else if (buttonPushCounter == 2) {
    // square
    fill(color(fillCol[s])); // random value from the fillCol array
    rect (width/2, height/2, val);
  } else if (buttonPushCounter == 3){
    // triangle
    fill(color(fillCol[t])); // random value from the fillCol array
    push();
      translate (width/2, height/2);
      let triVal = map(val, 0, 1023, 0, 1023/2);
      triangle(-triVal, triVal, 
                0, -triVal, 
                triVal, triVal);
    pop();
  } else {
    // draw nothing before loading the text again
  }

  // changes button label based on connection status
  if (!port.opened()) {
    connectBtn.html('Connect to Arduino');
  } else {
    connectBtn.html('Disconnect');
  }

    //if statement to reset the button push counter once all the shapes are drawn
    if (buttonPushCounter == 4) {
      buttonPushCounter = 1;
    }

    // save the current state as the last state, for next time through the loop
    lastButtonState = btnVal;
}



// load the arduino into the sketch
function connectBtnClick() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}