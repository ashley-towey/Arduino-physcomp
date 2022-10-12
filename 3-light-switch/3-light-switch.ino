// C++ Code 
/* 
* Created by ArduinoGetStarted.com
 *
 * This example code is in the public domain
 *
 * Tutorial page: https://arduinogetstarted.com/tutorials/arduino-button-toggle-led
 */
 
const int BUTTON_PIN = 2; // Arduino pin connected to button's pin
const int LED_PIN = 3; // Arduino pin connected to LED's pin

int ledState = LOW;     // the current state of LED
int lastButtonState;    // the previous state of button
int currentButtonState; // the current state of button

void setup() {
    Serial.begin(9600);         
    pinMode(BUTTON_PIN, INPUT_PULLUP); // set arduino pin to input pull-up mode
    pinMode(LED_PIN, OUTPUT);       

  currentButtonState = digitalRead(BUTTON_PIN);
}

void loop() {
  lastButtonState = currentButtonState;      // save the last state
  currentButtonState = digitalRead(BUTTON_PIN); // read new state

  if(lastButtonState == HIGH && currentButtonState == LOW) {
    Serial.println("The button is pressed");

    // toggle state of LED
    ledState = !ledState;

    // control LED arccoding to the toggled state
    digitalWrite(LED_PIN, ledState); 
  }
}

