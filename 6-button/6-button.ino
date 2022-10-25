const int buttonPin = 12;     // the number of the pushbutton pin
const int ledPin =  13;      // the number of the LED pin

int buttonState = 0;  // store the current state of the button
int previousButtonState = 0;  // previous button state
int controlState = 0; // check and store the current state

void setup() {
  // initialise the LED pin as an output
  pinMode(ledPin, OUTPUT);
  // initialise the pushbutton pin as an input
  pinMode(buttonPin, INPUT_PULLUP);
}

void loop() {
  buttonState = digitalRead(buttonPin); // read the button and make buttonState equal to that

  if (previousButtonState == 0 && buttonState == 1) { // Check if button has just been pressed
    if (controlState == 0) {
      digitalWrite(ledPin, HIGH);
      controlState = 1;
    } else {
      digitalWrite(ledPin, LOW);
      controlState = 0;
    }
  }
  previousButtonState = buttonState;
    delay(100);

}
