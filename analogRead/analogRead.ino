/*
  Arduino Code - for AnalogReadSerial
  Reads an analog input on pin 0, prints the result to the serial monitor.
  Attach the center pin of a potentiometer to pin A0, and the outside pins to +5V and ground.

 This example code is in the public domain.
 */
 int a0;
 int p1;
 int a1;
 int p2;
 String out;
 int temp1 = 0;
 int temp2 = 0;

// the setup routine runs once when you press reset:
void setup() {
  Serial.begin(9600);
  pinMode(12, OUTPUT);

}

// the loop routine runs over and over again forever:
void loop() {

  //outputs

  if(Serial.available()>0){
    char input = Serial.parseInt();
    analogWrite(11, input);
    delay(1000);
    analogWrite(11, 0);
  }
  

    //gettin inputs
    a0 = analogRead(A0);
    a1 = analogRead(A1);
    //Serial.println(a0);
    //Serial.println(a1);
    p1 = map(a0, 0, 1023, 0, 255);
    p2 = map(a1, 0, 1023, 0, 255);
    delay(50);
    out = String(p1)+','+String(p2);
    if(temp1 != p1 || temp2 != p2){
      Serial.println(out);
      temp1 = p1;
      temp2 = p2;
    }
  
  
}
