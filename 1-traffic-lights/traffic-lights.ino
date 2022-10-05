// C++ code
//

int colorDelay = 5000;

void setup()
{
  pinMode(13, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(11, OUTPUT);
}

void loop()
{
  // red
  digitalWrite(13, HIGH);
  digitalWrite(12, LOW);
  digitalWrite(11, LOW);
  delay(colorDelay); // Delay a little bit to improve simulation performance

  // amber
  digitalWrite(13, LOW);
  digitalWrite(12, HIGH);
  digitalWrite(11, LOW);
  delay(colorDelay); // Delay a little bit to improve simulation performance

  // green
  digitalWrite(13, LOW);
  digitalWrite(12, LOW);
  digitalWrite(11, HIGH);
  delay(colorDelay); // Delay a little bit to improve simulation performance
}