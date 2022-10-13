// Code written by Will Westwood

int LEDpins[] = {10, 9, 8, 7, 6, 5, 4, 3, 2}; // LED Pins in order of p1 - p2
int p1pin = 12; // Player 1 pin
int p2pin = 11; // Player 2 pin
int p1score = 0;
int p2score = 0;
int p1state = 0;
int p1stateOld = 0; // Store states of buttons
int p2state = 0;   // to block holding cheat
int p2stateOld = 0;
void setup() {
  for(int i=0; i < 9; i++) {
    pinMode(LEDpins[i], OUTPUT);
  }
  pinMode(p1pin, INPUT);
  pinMode(p2pin, INPUT);
  Serial.begin(9600);
}
void loop() {
  p1stateOld = p1state; // Store button state from previous
  p2stateOld = p2state; // loop itteration
  p1state = digitalRead(p1pin); // update current button states
  p2state = digitalRead(p2pin);
  if (p1state == LOW && p1stateOld == HIGH) { // Check if button has just been relased
    printScore(0); // Log button press to serial
    p1score++; // Add 1 to score
    updateLEDs(); // update LEDs with new score
  }
  if (p2state == LOW && p2stateOld == HIGH) {
    printScore(1);
    p2score++;
    updateLEDs();
  }
  
  delay(10); // Added a delay to smooth the loop
}
// player button printer function
void printScore(int player) { 
  if (player == 0) {
    Serial.println("Player 1");
  } else {
    Serial.println("Player 2");
  }
}
// Function to update player LEDs
void updateLEDs() {
  // Switch function to check when score milestone hit
  switch(p1score) {
    case 10:
    digitalWrite(LEDpins[0], HIGH);
    break;
    case 20:
    digitalWrite(LEDpins[1], HIGH);
    break;
    
    case 40:
    digitalWrite(LEDpins[2], HIGH);
    break;
    case 65:
    digitalWrite(LEDpins[3], HIGH);
    break;
    case 100:
    digitalWrite(LEDpins[4], HIGH);
    winner(0);
    break;
    default:
    break;
  }
  switch(p2score) {
    case 10:
    digitalWrite(LEDpins[8], HIGH);
    break;
    case 20:
    digitalWrite(LEDpins[7], HIGH);
    break;
    
    case 40:
    digitalWrite(LEDpins[6], HIGH);
    break;
    case 65:
    digitalWrite(LEDpins[5], HIGH);
    break;
    case 100:
    digitalWrite(LEDpins[4], HIGH);
    winner(1);
    break;
  }
  
}
// Play winner annimation
void winner(int player) {
  
  for (int i=0; i<9; i++) {
    digitalWrite(LEDpins[i], LOW);
  }
  
  if (player == 1) {
    for (int l=0; l<10; l++) {
      
      for (int i=5; i<9; i++) {
        digitalWrite(LEDpins[i], HIGH); 
      }
      delay(500);
      for (int i=5; i<9; i++) {
        digitalWrite(LEDpins[i], LOW); 
      }
      delay(500);
        
    }
    
  } else {
    for (int l=0; l<10; l++) {
      for (int i=0; i<4; i++) {
        digitalWrite(LEDpins[i], HIGH); 
      }
      delay(500);
      for (int i=0; i<4; i++) {
       digitalWrite(LEDpins[i], LOW); 
      }
      delay(500);
      
    }
  }
  reset();
  
}
// Reset game without restarting arduino
void reset(){
  for (int i=0; i<9; i++) {
    digitalWrite(LEDpins[i], HIGH);
  }
  p1score = 0;
  p2score = 0;
  delay(1000);
  for (int i=0; i<9; i++) {
    digitalWrite(LEDpins[i], LOW);
  }
}
