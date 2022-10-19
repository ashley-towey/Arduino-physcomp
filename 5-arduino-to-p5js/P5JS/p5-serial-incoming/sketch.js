let port;
let connectBtn;
let preVal = 0; // declare potentiometer base value to stop the sketch flickering
let btnPreVal = 0; // declare button base value to stop the sketch flickering
let btnClicks = 0;

function setup() {
  createCanvas(600, 600);
  background(220);

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

    // print out the value of serial or val to the console
    console.log(val, ' & ', btnVal, '+', btnClicks);

  /* commenting out to test rotating between shapes
  if (val.length > 0) {
    //display the incoming data
    fill(0);
    text(val + ' & ' + btnVal, 10, height-20);
    
    //do something with the data!
    noStroke();
    fill(255,200,0);
    ellipse(width/2,height/2,val,val);
  }
*/

  // when the button is pressed change the state of shape
  if (btnVal > .5) {
    changeShape();
  }

  // changes button label based on connection status
  if (!port.opened()) {
    connectBtn.html('Connect to Arduino');
  } else {
    connectBtn.html('Disconnect');
  }
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
  btnClicks + 1;
}
