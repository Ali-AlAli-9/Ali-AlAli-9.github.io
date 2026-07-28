/*
  IoT Home Control via Telegram Bot
  ESP8266 (NodeMCU) based system
  =================================
  - Control relays (lights, fans) via Telegram commands
  - Flame sensor for fire detection
  - Secure HTTPS communication
  - Authorized users only

  Libraries Required:
    - ESP8266WiFi (built-in)
    - WiFiClientSecure (built-in)
    - UniversalTelegramBot by Brian Lough
    - ArduinoJson (for Telegram Bot library)

  Connections:
    GPIO D1 (GPIO5)  → Relay 1 (Light)
    GPIO D2 (GPIO4)  → Relay 2 (Fan)
    GPIO A0          → Flame Sensor (Analog Out)
*/

#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <UniversalTelegramBot.h>
#include <ArduinoJson.h>

// ===== WiFi Configuration =====
const char* ssid     = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// ===== Telegram Configuration =====
#define BOTtoken "YOUR_BOT_TOKEN_HERE"
#define CHAT_ID  "YOUR_TELEGRAM_CHAT_ID"

// ===== Pin Definitions =====
const int lampPin = 5;          // D1 on NodeMCU
const int fanPin  = 4;          // D2 on NodeMCU
const int flameSensorPin = A0;  // Analog pin

// ===== Bot Client =====
WiFiClientSecure client;
UniversalTelegramBot bot(BOTtoken, client);

// ===== Timing =====
unsigned long lastTimeBotRan;
const int botRequestDelay = 1000; // 1 second

// ===== Connect to Wi-Fi =====
void connect2Wifi() {
    Serial.print("Connecting to Wi-Fi");
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nWi-Fi connected!");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
}

// ===== Handle Incoming Messages =====
void handleNewMessages(int numNewMessages) {
    for (int i = 0; i < numNewMessages; i++) {
        String chat_id = String(bot.messages[i].chat_id);

        // Authorization check
        if (chat_id != CHAT_ID) {
            bot.sendMessage(chat_id, "Unauthorized user", "");
            continue;
        }

        String text = bot.messages[i].text;

        // ---- Lamp Control ----
        if (text == "/lamp_on") {
            digitalWrite(lampPin, HIGH);
            bot.sendMessage(chat_id, "Lamp turned ON", "");
        }
        else if (text == "/lamp_off") {
            digitalWrite(lampPin, LOW);
            bot.sendMessage(chat_id, "Lamp turned OFF", "");
        }

        // ---- Fan Control ----
        else if (text == "/fan_on") {
            digitalWrite(fanPin, HIGH);
            bot.sendMessage(chat_id, "Fan turned ON", "");
        }
        else if (text == "/fan_off") {
            digitalWrite(fanPin, LOW);
            bot.sendMessage(chat_id, "Fan turned OFF", "");
        }

        // ---- Flame Sensor Status ----
        else if (text == "/flame_status") {
            int flameValue = analogRead(flameSensorPin);
            String status = (flameValue < 500) ? "Flame detected!" : "No flame detected.";
            bot.sendMessage(chat_id, "Flame sensor value: " + String(flameValue) +
                            "\nStatus: " + status, "");
        }

        // ---- Status Report ----
        else if (text == "/status") {
            int flameValue = analogRead(flameSensorPin);
            String msg = "System Status:\n";
            msg += "Lamp: " + String(digitalRead(lampPin) ? "ON" : "OFF") + "\n";
            msg += "Fan: " + String(digitalRead(fanPin) ? "ON" : "OFF") + "\n";
            msg += "Flame sensor: " + String(flameValue) + "\n";
            msg += String((flameValue < 500) ? "WARNING: Flame detected!" : "No flame detected.");
            bot.sendMessage(chat_id, msg, "");
        }
    }
}

// ===== Setup =====
void setup() {
    Serial.begin(115200);

    // Initialize pins
    pinMode(lampPin, OUTPUT);
    pinMode(fanPin, OUTPUT);
    pinMode(flameSensorPin, INPUT);

    // Start with everything OFF
    digitalWrite(lampPin, LOW);
    digitalWrite(fanPin, LOW);

    // Connect to Wi-Fi
    connect2Wifi();

    // Bypass SSL certificate verification (for development)
    client.setInsecure();

    // Start bot
    bot.begin();

    Serial.println("System ready! Waiting for commands...");
}

// ===== Main Loop =====
void loop() {
    // Poll for new messages periodically
    if (millis() > lastTimeBotRan + botRequestDelay) {
        int numNewMessages = bot.getUpdates(bot.last_message_received + 1);
        while (numNewMessages) {
            handleNewMessages(numNewMessages);
            numNewMessages = bot.getUpdates(bot.last_message_received + 1);
        }
        lastTimeBotRan = millis();
    }
}
