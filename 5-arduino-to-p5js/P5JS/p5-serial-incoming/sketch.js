let port;
let connectBtn;
let preVal = 0;
let btnPreVal = 0;

function setup() {
  createCanvas(600, 600);
  background(220);

  port = createSerial();

  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(20, 20);
  connectBtn.mousePressed(connectBtnClick);

}

function draw() {
  background(220);

  // reads in complete lines and prints them at the
  // bottom of the canvas
  let inputString = port.readUntil("\n")/* || preVal*/;
  let val = inputString.split(':')[0] || preVal;
  //let val = serialRead.split
  
    if (val) {
      preVal = val;
    }

    let btnVal = inputString.split(':')[1] || btnPreVal;
    if (btnVal) {
      btnPreVal = btnVal;
    }

    // print out the value of serial or val to the console
    console.log(val, btnVal);

  if (val.length > 0) {
    //display the incoming data
    fill(0);
    text(val, 10, height-20);
    
    //do something with the data!
    noStroke();
    fill(255,200,0);
    ellipse(width/2,height/2,val,val);
    
  }

  if (btnVal> .5) {
    rect (50, 50, 200);
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

