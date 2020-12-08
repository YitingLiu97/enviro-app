/*
  POST with headers client for ArduinoHttpClient library
  Connects to server once every five seconds, sends a POST request
  with custome headers and a request body

  created 14 Feb 2016
  by Tom Igoe
  modified 18 Mar 2017
  by Sandeep Mistry
  modified 22 Jan 2019
  by Tom Igoe

  this example is in the public domain
*/
#include <ArduinoHttpClient.h>
//#include <WiFi101.h>
#include <WiFiNINA.h>
#include <RTCZero.h>

#include "arduino_secrets.h"
RTCZero rtc;
unsigned long startTime;
///////please enter your sensitive data in the Secret tab/arduino_secrets.h
/////// Wifi Settings ///////
char ssid[] = SECRET_SSID;
char pass[] = SECRET_PASS;

//get the server address
//const char serverAddress[] = "arduino-json-server.glitch.me";  // server address - glitch to test and digital ocean server for final?
const char serverAddress[] = "68.183.121.203";  // server address - glitch to test and digital ocean server for final?

int port = 8080;
int reconnects = 0;
//WiFiSSLClient wifi;
WiFiClient wifi;

HttpClient client = HttpClient(wifi, serverAddress, port);
int status = WL_IDLE_STATUS;

int micInput = A0;
int waterInput = A1;
//int led = 3;
int micVal = 0;
int waterVal = 0;

void getData() {
  micVal = analogRead(micInput);
  Serial.print("micVal");
  Serial.println(micVal);

  waterVal = analogRead(waterInput);
  Serial.print("waterVal");
  Serial.println(waterVal);

}
void setup() {
  Serial.begin(9600);
  rtc.begin();
  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to Network named: ");
    Serial.println(ssid);                   // print the network name (SSID);
    // Connect to WPA/WPA2 network:
    status = WiFi.begin(ssid, pass);
  }

  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
}

void loop() {
  connectToNetwork();

  Serial.println("making PUT request");
  //  String postData = "name=Alice&age=12";
  String path = "/data";
  micVal = analogRead(micInput);
  Serial.print("micVal");
  Serial.println(micVal);

  waterVal = analogRead(waterInput);
  Serial.print("waterVal");
  Serial.println(waterVal);
  String contentType = "application/x-www-form-urlencoded";

  String putData = "mic=" + String(micVal);
  putData += "&water=" + String(waterVal);

  client.put(path, contentType, putData);
  int statusCode = client.responseStatusCode();
  String response = client.responseBody();

  Serial.print("Status code: ");
  Serial.println(statusCode);
  Serial.print("Response: ");
  Serial.println(response);

  Serial.println("Wait 5 minutes");
  delay(300000);
}

void connectToNetwork() {
  // try to connect to the network:
  // not sure if this works tho 

  while ( status != WL_CONNECTED) {
    //Connect to WPA / WPA2 network:
    status=WiFi.begin(ssid, pass);
    delay(2000);
    // increment the reconnect attempts:
    reconnects++;
  }
  // set the time from the network:
  int attempts = 0;
  unsigned long epoch;
  do {
    epoch = WiFi.getTime();
    delay(1000);
    attempts++;
  } while (attempts < 5);

  rtc.setEpoch(epoch);

  //set the startTime as the connect time of the server:
  startTime = rtc.getEpoch();
}
