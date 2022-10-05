// C++ code
//
int colorDelay = 3;

void setup()
{
  pinMode(11, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(3, OUTPUT);
}

void loop()
{
  // green light
  for (int brightness = 0; brightness < 255; brightness ++) {
    analogWrite(11, brightness);
    analogWrite(5, 0);
    analogWrite(3, 0);
    delay(colorDelay);
}  

  for (int brightness = 255; brightness > 0; brightness --) {
    analogWrite(11, brightness);
    analogWrite(5, 0);
    analogWrite(3, 0);
    delay(colorDelay);
  }
  // amber light
  for (int brightness = 0; brightness < 255; brightness ++) {
    analogWrite(11, 0);
    analogWrite(5, brightness);
    analogWrite(3, 0);
    delay(colorDelay);
}  

  for (int brightness = 255; brightness > 0; brightness --) {
    analogWrite(11, 0);
    analogWrite(5, brightness);
    analogWrite(3, 0);
    delay(colorDelay);
  }
    // red light
  for (int brightness = 0; brightness < 255; brightness ++) {
    analogWrite(11, 0);
    analogWrite(5, 0);
    analogWrite(3, brightness);
    delay(colorDelay);
}  

  for (int brightness = 255; brightness > 0; brightness --) {
    analogWrite(11, 0);
    analogWrite(5, 0);
    analogWrite(3, brightness);
    delay(colorDelay);
  }

}
