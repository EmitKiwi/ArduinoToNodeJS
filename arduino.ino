// distance sensor connected on pin 8 and 7 
#define trigPin 8
#define echoPin 7

void setup() {
  Serial.begin (9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  int duration, distance;
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(1000);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = (duration/2) / 29.1;
  if (distance >= 170 || distance <= 0){
    // my defined error message
    Serial.println(201);
  }
  else {
    Serial.println(distance);
  }
  delay(10);
}
