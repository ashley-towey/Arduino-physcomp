let port;
let connectBtn;
let preVal = 0; // declare potentiometer base value to stop the sketch flickering
let btnPreVal = 0; // declare button base value to stop the sketch flickering
let buttonPushCounter = 0; // counter for the number of button presses
// let buttonState = 0; // current state of the button
let lastButtonState = 0; // previous state of the button

function setup() {
  createCanvas(600, 600);
  background(220);
  rectMode(CENTER);
  textAlign(CENTER);

  port = createSerial();

  // initial setup button
  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(20, 20);
  connectBtn.mousePressed(connectBtnClick);

}

function draw() {
  background(220);

  // reads in complete lines and prints them at the
  // bottom of the canvas
  let inputString = port.readUntil("\n"); // declare input variable as the arduino serial output

  // potentiometer input
  let val = inputString.split(':')[0] || preVal; // splitting the input string and extracting the potentiometer value
  // change the value of preVal if val is communicated
    if (val) {
      preVal = val;
    }

    // button input
    let btnVal = inputString.split(':')[1] || btnPreVal; // splitting the input string and extracting the button value
    // change the value of preBtnVal if  btnVal is received
    if (btnVal) {
      btnPreVal = btnVal;
    }

    // when the button is pressed change the state of shape
    if (btnVal != lastButtonState) {
      // if the state has changed, incremement the counter
      if (btnVal == 1) {
        buttonPushCounter++;
      }
    // changeShape();
  }

    // print out the value of serial or val to the console
    console.log(val, ' & ', btnVal, '+', buttonPushCounter);

  // drawing different shapes based on the buttonPushCounter
  if (buttonPushCounter == 0) {
    text('Click the button', width/2, height/2);
  } else if (buttonPushCounter == 1) {
    ellipse(width/2,height/2,val);
  } else if (buttonPushCounter == 2) {
    rect (width/2, height/2, val);
  } else if (buttonPushCounter == 3){
    push();
      translate (width/2, height/2);
      let triVal = map(val, 0, 1023, 0, 1023/2);
      triangle(-triVal, triVal, 
                0, -triVal, 
                triVal, triVal);
    pop();
  } else {
    // draw nothing
  }

  // changes button label based on connection status
  if (!port.opened()) {
    connectBtn.html('Connect to Arduino');
  } else {
    connectBtn.html('Disconnect');
  }

    //if statement to reset the button push counter
    if (buttonPushCounter == 4) {
      buttonPushCounter = 0;
    }

    // save the current state as the last state, for next time through the loop
    lastButtonState = btnVal;
}

function connectBtnClick() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}

// function to rotate between three different shapes & called when the button is pressed
function changeShape() {
  // for (let i = 0; i > 2; i++){
  //   btnClicks + i;
    // text(val + ' & ' + btnVal + '+' + btnClicks, 10, height-20);
  //}
  // btnClicks + 1;
}
