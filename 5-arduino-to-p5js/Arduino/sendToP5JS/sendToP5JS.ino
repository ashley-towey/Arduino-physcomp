
void setup()
{
  // Connect to serial
  Serial.begin(9600);
 
}

void loop() {
  int val = analogRead(A0);
  int btn = digitalRead(2);

  String inputString = String(val) + ":" + String(btn);
  
  Serial.println(inputString);
  // 10 readings per second
  delay(100);
}
