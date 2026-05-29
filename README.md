# 🐟 Smart Aquatic Steward
### An Automated Management and Water Monitoring System for Fish Tanks

![Platform](https://img.shields.io/badge/Mobile-React%20Native-61DAFB?logo=react)
![Language](https://img.shields.io/badge/Firmware-C%20(ESP32)-00599C?logo=c)
![Database](https://img.shields.io/badge/Database-Firebase-FFCA28?logo=firebase)
![License](https://img.shields.io/badge/License-MIT-green)

Smart Aquatic Steward is an IoT-based fish tank management system that automates water monitoring, water changes, and feeding schedules. It combines hardware sensors, an ESP32 microcontroller, and a React Native mobile application to give fish keepers real-time visibility and control over their aquatic environment.

<p align="center">
  <img src="assets/img1.jpg" alt="Hardware Setup — Front View" height="280" />
  &nbsp;&nbsp;&nbsp;
  <img src="assets/img2.png" alt="Mobile App Controlling the Fish Tank" height="280" />
</p>

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Objectives](#-objectives)
- [Features](#-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Hardware Components](#-hardware-components)
- [Mobile Application](#-mobile-application)
- [Getting Started](#-getting-started)
- [ESP32 Firmware Setup](#-esp32-firmware-setup)
- [Firebase Configuration](#-firebase-configuration)
- [SMS Notification Setup](#-sms-notification-setup)
- [Contributing](#-contributing)
- [License](#-license)

---

## ❗ Problem Statement

Fish keeping presents several recurring challenges that this system aims to solve:

1. **Lack of monitoring tools** — Fish keepers have no easy way to continuously monitor critical water parameters such as pH level, temperature, and turbidity.
2. **Time-consuming manual water changes** — Owners must manually remove and replace water, which is labor-intensive and often done inconsistently.
3. **Inconsistent feeding schedules** — Managing timely feeding is prone to human error, especially when the owner is unavailable.
4. **No real-time water quality tracking** — Without continuous monitoring, critical changes in water quality can go undetected until it is too late.

---

## 🎯 Objectives

1. Design and implement a sensor-based system to continuously monitor key water parameters — pH level, temperature, and turbidity.
2. Implement an automated water-changing system that allows users to remotely control water changes via the mobile app.
3. Develop an automated feeding mechanism that dispenses food on a set, reliable schedule.
4. Build a mobile application that displays real-time sensor data and provides continuous tracking of water quality parameters with SMS alerts for critical conditions.

---

## ✨ Features

- **Real-time water monitoring** — Live readings of pH, temperature, and turbidity streamed from the ESP32 to the mobile app via Firebase.
- **Automated water changes** — Remotely trigger or schedule water changes directly from the app.
- **Automated feeding** — Set feeding schedules that the system executes reliably regardless of owner availability.
- **SMS notifications** — Receive instant SMS alerts via iProgSMS when water parameters fall outside safe ranges.
- **Historical tracking** — View trends and logs of water quality data over time.
- **Android mobile app** — Built with React Native for Android devices.

### 📸 App Screenshots

<p align="center">
  <img src="assets/sasapp.png" alt="Smart Aquatic Steward — All Screens" width="100%" />
</p>

The application consists of five main screens, each accessible via the bottom navigation bar:

| Screen | Description |
|---|---|
| **Parameter Monitoring** | The home dashboard displaying real-time sensor readings — water temperature (°C), pH level, and turbidity status. Each parameter is presented with a clear icon and color-coded value for quick assessment of tank health. |
| **Alert Logs** | A chronological log of all triggered alerts. Users can filter by parameter type (Water Temp, pH Level, Turbidity) and date. Each entry shows the timestamp and the exact out-of-range reading that triggered the alert. |
| **Fish Feeder** | Manages automated feeding schedules. Displays all scheduled feeding times in a scrollable list with delete options. Users can add new schedules using the "+" button or manually trigger a feeding session. |
| **Water Changer** | Controls the automated water change system. Provides both automated scheduling (configurable interval and time) and manual controls with "Refill ON" and "Drain ON" buttons for on-demand water changes. |
| **Parameter Settings** | Allows users to configure safe parameter ranges for temperature and pH. Includes preset profiles for common fish types (Default, Tropical Community Fish, Goldfish, African Cichlids) for quick configuration. |

---

## 🏗 System Architecture

```
┌─────────────────────────────────────┐
│          Mobile Application          │
│        (React Native + TypeScript)   │
└────────────────┬────────────────────┘
                 │ Real-time sync
                 ▼
┌─────────────────────────────────────┐
│             Firebase                 │
│    (Realtime Database + Auth)        │
└────────────────┬────────────────────┘
                 │ Read/Write
                 ▼
┌─────────────────────────────────────┐
│           ESP32 Firmware             │
│          (Written in C)              │
├─────────────────────────────────────┤
│  pH Sensor │ Temp Sensor │ Turbidity │
│  Water Pump │ Feeder Motor           │
└─────────────────────────────────────┘
                 │ SMS Alerts
                 ▼
┌─────────────────────────────────────┐
│         iProgSMS API                 │
│    (SMS Notification Service)        │
└─────────────────────────────────────┘
```

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Mobile App | React Native (TypeScript) |
| Database | Firebase Realtime Database |
| Authentication | Firebase Auth |
| Microcontroller | ESP32 |
| Firmware Language | C |
| SMS Notifications | iProgSMS API |

---

## 🔧 Hardware Components

| Component | Purpose |
|---|---|
| ESP32 Microcontroller | Central processing unit for sensors and actuators |
| pH Sensor | Measures acidity/alkalinity of the water |
| Water Temperature Sensor | Monitors water temperature in real time |
| Turbidity Sensor | Detects water clarity and cloudiness |
| Water Pump / Solenoid Valve | Automates water change operations |
| Servo / Stepper Motor | Drives the automated fish feeder |
| Power Supply | Powers the ESP32 and connected components |

---

## 📱 Mobile Application

The mobile app is built with **React Native** and **TypeScript**, providing a clean dashboard for monitoring and control.

### Key Screens

- **Dashboard** — Live sensor readings (pH, temperature, turbidity) with status indicators
- **Alerts** — History of triggered notifications and critical events
- **Feeding Schedule** — Set, edit, and manage automated feeding times
- **Water Change** — Manually trigger or schedule automated water changes
- **Settings** — Configure alert thresholds and SMS notification preferences

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- Expo CLI
- Android Studio or Xcode (for emulator/device testing)
- Firebase account
- iProgSMS account
- Arduino IDE (for ESP32 firmware)

### Mobile App Setup

```bash
# Clone the repository
git clone https://github.com/your-username/smart-aquatic-steward.git
cd smart-aquatic-steward

# Install dependencies
npm install

# Start Expo development server
npx expo start

# Run on Android
npx expo run:android

# Run on iOS
npx expo run:ios
```

---

## 🔌 ESP32 Firmware Setup

1. Open the `firmware/` folder in **Arduino IDE**.
2. Install the following libraries via the Arduino Library Manager:
   - `FirebaseClient` by Mobizt
   - `OneWire`
   - `DallasTemperature`
   - `DFRobot_PH`
   - `ESP32Servo`
3. Open the firmware source file and update the WiFi and Firebase credentials (see the source code below).
4. Select your ESP32 board under **Tools > Board > ESP32 Dev Module**.
5. Upload the firmware to your ESP32.

### Source Code

```cpp
// ================= Feature Flags =================
#define ENABLE_USER_AUTH
#define ENABLE_DATABASE

// ================= Libraries =================
#include <WiFi.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <WiFiClientSecure.h>
#include <FirebaseClient.h>
#include <EEPROM.h>
#include "DFRobot_PH.h"
#include <FBJS_Config.h>
#include <FirebaseJson.h>
#include <ESP32Servo.h>
#include "time.h"

// ================= WiFi Credentials =================
#define WIFI_SSID "YOUR_WIFI_SSID"
#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"

// ================= Firebase Credentials =================
#define FIREBASE_API_KEY "YOUR_FIREBASE_API_KEY"
#define FIREBASE_DATABASE_URL "YOUR_FIREBASE_DATABASE_URL"
#define USER_EMAIL "YOUR_FIREBASE_USER_EMAIL"
#define USER_PASSWORD "YOUR_FIREBASE_USER_PASSWORD"

// ================= Firebase Setup =================
WiFiClientSecure ssl_sensor;
WiFiClientSecure ssl_devices;
UserAuth user_auth(FIREBASE_API_KEY, USER_EMAIL, USER_PASSWORD);
FirebaseApp app1, app2;
RealtimeDatabase Database1, Database2;
using AsyncClient = AsyncClientClass;
AsyncClient async_sensor(ssl_sensor);
AsyncClient async_devices(ssl_devices);

// ================= NTP / Time =================
const char* ntpServer = "pool.ntp.org";
const long gmtOffset_sec = 8 * 3600;  // GMT+8 (Philippines)
const int daylightOffset_sec = 0;

// ================= DS18B20 Temp Sensor =================
#define ONE_WIRE_BUS 4
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

// ================= pH Sensor =================
#define PH_PIN 32
float voltage = 0.0;
float phValue = 0.0;
float truepHValue = 0.0;
DFRobot_PH ph;

// ================= Turbidity Sensor =================
#define TURBIDITY_SENSOR_PIN 35

// ================= Servo (Feeder) =================
Servo feederServo;
#define SERVO_PIN 18
#define SERVO_OPEN_ANGLE 180
#define SERVO_CLOSE_ANGLE 0
const unsigned long SERVO_OPEN_MS = 2000UL; // how long to keep servo open (ms)
enum ServoState { SERVO_IDLE = 0, SERVO_OPENING };
ServoState servoState = SERVO_IDLE;
unsigned long servoActionStart = 0UL;
void startServoFeedOnce();

// ================= Feeder Variables =================
const unsigned long FETCH_FEEDERS_INTERVAL = 5000UL;  // fetch feeder schedule every 5s
unsigned long lastFetchFeeders = 0UL;
int totalFeeds = 0;
int feedHours[50];
int feedMinutes[50];

// keep a per-minute feed lock so we don't double-feed same minute
int lastFedMinuteForIndex[50];
static int lastFedKey = -1;

// force-feed poll interval
const unsigned long FORCE_FEED_POLL_MS = 1000UL;
unsigned long lastForceFeedPoll = 0UL;

// ================= Water Change (Pump & Valve) =================
// pins
#define PUMP_PIN 26
#define VALVE_PIN 27
#define WATER_LEVEL 25
#define WATER_DETECTED HIGH  // adjust if your sensor uses LOW for detection

// schedule fetched from /change-schedule
int scheduleHour = 0;
int scheduleMinute = 0;
float intervalDays = 0;
unsigned long intervalMillis = 0;
unsigned long lastRunMillis = 0;
bool ranToday = false;

// water change state machine
enum WaterChangeState { WC_IDLE, WC_DRAINING, WC_FILLING };
WaterChangeState wcState = WC_IDLE;
unsigned long wcStageStart = 0UL;

// polling intervals
const unsigned long SCHEDULE_FETCH_INTERVAL = 10UL * 1000UL; // 10s
unsigned long lastFetchSchedule = 0UL;
unsigned long lastCheckWaterChange = 0UL;
const unsigned long WATER_CHANGE_CHECK_MS = 1000UL;

// manual control read interval
const unsigned long MANUAL_CTRL_POLL_MS = 500UL;
unsigned long lastManualCtrlPoll = 0UL;

// water level status update interval
const unsigned long WATER_LEVEL_UPDATE_MS = 1000UL;
unsigned long lastWaterLevelUpdate = 0UL;

// manual states
bool manualPump = false;
bool manualValve = false;
bool manualOverride = false;

// ================= Sensor Scheduling =================
unsigned long lastSensorCycle = 0UL;
const unsigned long SENSOR_CYCLE_INTERVAL = 5000UL; // run sensor cycle every 5s
unsigned long tempRequestTime = 0UL;
const unsigned long DS18_CONVERSION_DELAY = 1000UL; // ms
const unsigned long UPLOAD_STAGGER_MS = 50UL;

// last uploaded values
float lastUploadedTemp = NAN;
float lastUploadedPH = NAN;
String lastUploadedTurbidity = "";

// WiFi reconnect helper
void ensureWiFi() {
  if (WiFi.status() == WL_CONNECTED) return;
  Serial.print("WiFi disconnected, reconnecting...");
  WiFi.disconnect();
  WiFi.reconnect();
  unsigned long start = millis();
  while (millis() - start < 5000UL) {
    if (WiFi.status() == WL_CONNECTED) {
      Serial.println(" reconnected.");
      return;
    }
    delay(200);
    Serial.print(".");
  }
  Serial.println(" failed. Will keep trying in background.");
}

// ================= Forward Declarations =================
void getFeederTimes();
void fetchChangeSchedule(bool resetRunState = true);
void handleSensors();
void handleFeederLogic();
void handleWaterChange();
void checkWaterChange();
void handleManualControl();
void updateWaterLevelStatus();
void initFirebaseNonBlocking();

// ================= Setup =================
void setup() {
  Serial.begin(115200);
  delay(200);

  // Sensors
  sensors.begin();
  sensors.setWaitForConversion(false); // non-blocking DS18 conversions
  EEPROM.begin(64);
  ph.begin();

  // Feeder arrays init
  totalFeeds = 0;
  memset(feedHours, -1, sizeof(feedHours));
  memset(feedMinutes, -1, sizeof(feedMinutes));
  for (int i = 0; i < 50; ++i) lastFedMinuteForIndex[i] = -1;

  // Servo init
  feederServo.setPeriodHertz(50);
  feederServo.attach(SERVO_PIN, 500, 2500);
  feederServo.write(SERVO_CLOSE_ANGLE);
  servoState = SERVO_IDLE;

  // Pump/Valve pins
  pinMode(PUMP_PIN, OUTPUT);
  pinMode(VALVE_PIN, OUTPUT);
  pinMode(WATER_LEVEL, INPUT);
  digitalWrite(PUMP_PIN, HIGH); // pump OFF (HIGH as in original)
  digitalWrite(VALVE_PIN, HIGH); // valve closed

  // WiFi connect (attempt, non-blocking fallback)
  Serial.print("Connecting to Wi-Fi");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  unsigned long wifiStart = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - wifiStart < 10000UL) {
    delay(250);
    Serial.print(".");
  }
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n✅ Wi-Fi connected!");
    Serial.println("IP: " + WiFi.localIP().toString());
  } else {
    Serial.println("\n⚠️ Wi-Fi connect timed out — continuing, will retry in loop.");
  }

  // NTP
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);

  // Firebase initialization (non-blocking authentication loop)
  ssl_sensor.setInsecure();
  ssl_devices.setInsecure();

  initializeApp(async_sensor, app1, getAuth(user_auth), nullptr, "authTask1");
  app1.getApp<RealtimeDatabase>(Database1);
  Database1.url(FIREBASE_DATABASE_URL);

  initializeApp(async_devices, app2, getAuth(user_auth), nullptr, "authTask2");
  app2.getApp<RealtimeDatabase>(Database2);
  Database2.url(FIREBASE_DATABASE_URL);

  // Kick off first DS18 conversion (we'll read after conversion delay)
  sensors.requestTemperatures();
  tempRequestTime = millis();

  // set initial timers
  lastFetchFeeders = millis();
  lastFetchSchedule = millis();
  lastManualCtrlPoll = 0;
  lastForceFeedPoll = 0;
}

// ===================== CONNECTION HEALTH-CHECK =====================
void handleConnectionHealth() {
  static unsigned long lastCheck = 0;
  static unsigned long lastGoodFirebase = millis();
  const unsigned long CHECK_INTERVAL = 10000UL;  // every 10 s
  const unsigned long RESTART_TIMEOUT = 30UL * 60UL * 1000UL; // 30 min

  unsigned long now = millis();
  if (now - lastCheck < CHECK_INTERVAL) return;
  lastCheck = now;

  // WiFi check
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("⚠️ WiFi disconnected! Attempting reconnect...");
    WiFi.disconnect();
    WiFi.reconnect();
    unsigned long wifiStart = millis();
    while (WiFi.status() != WL_CONNECTED && millis() - wifiStart < 10000) {
      delay(500);
      Serial.print(".");
    }
    Serial.println();
    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("✅ WiFi reconnected.");
      lastGoodFirebase = now;
    } else {
      Serial.println("❌ WiFi reconnection failed.");
    }
  }

  // Firebase readiness
  bool firebaseOK = app1.ready() && app2.ready();
  if (!firebaseOK) {
    Serial.println("⚠️ Firebase not ready — reinitializing...");
    initializeApp(async_sensor, app1, getAuth(user_auth), nullptr, "authTask1");
    initializeApp(async_devices, app2, getAuth(user_auth), nullptr, "authTask2");
  } else {
    lastGoodFirebase = now;
  }

  // Restart if stuck too long
  if (now - lastGoodFirebase > RESTART_TIMEOUT) {
    Serial.println("🚨 No good Firebase connection for 30 min — restarting ESP...");
    ESP.restart();
  }
}

// ================= Main loop =================
void loop() {
  // --- Maintain Firebase internal tasks for both clients ---
  app1.loop();
  app2.loop();
  Database1.loop();
  Database2.loop();

  // --- Maintain WiFi connection ---
  if (WiFi.status() != WL_CONNECTED) ensureWiFi();

  handleConnectionHealth();

  // --- Run once when both Firebase apps are ready ---
  static bool firebaseReadyHandled = false;
  if (app1.ready() && app2.ready() && !firebaseReadyHandled) {
    Serial.println("✅ Both Firebase apps authenticated successfully.");
    getFeederTimes();           // initial feeder schedule fetch
    fetchChangeSchedule(true);  // initial water change schedule fetch
    firebaseReadyHandled = true;
  }

  // --- Sensor + Health-check tasks (Database1) ---
  handleSensors();

  // --- Feeder logic (Database2) ---
  handleFeederLogic();

  // --- Water changer tasks (Database2) ---
  updateWaterLevelStatus();
  handleManualControl();

  // --- Schedule fetching (Database2) ---
  if (millis() - lastFetchSchedule >= SCHEDULE_FETCH_INTERVAL) {
    fetchChangeSchedule(false);
    lastFetchSchedule = millis();
  }

  // --- Automation logic ---
  checkWaterChange();
  handleWaterChange();

  // --- Tiny yield to keep system responsive ---
  delay(2);
}

void handleSensors() {
  unsigned long now = millis();

  // Start new conversion at interval
  if (now - lastSensorCycle >= SENSOR_CYCLE_INTERVAL) {
    lastSensorCycle = now;
    sensors.requestTemperatures();
    tempRequestTime = now;
  }

  // After conversion delay, read DS18B20
  if (tempRequestTime != 0 && now - tempRequestTime >= DS18_CONVERSION_DELAY) {
    float tempC = sensors.getTempCByIndex(0);
    bool tempValid = (tempC != DEVICE_DISCONNECTED_C && !isnan(tempC));

    if (tempValid) {
      lastUploadedTemp = tempC;
      Serial.printf("🌡 Water Temp: %.2f °C\n", tempC);
    } else {
      Serial.println("⚠️ Temperature sensor disconnected or invalid.");
    }

    // ---------------- PH ----------------
    int adcPHRaw = analogRead(PH_PIN);
    bool phValid = !(adcPHRaw < 900 || adcPHRaw > 4000);
    float voltagePH = (float)adcPHRaw / 4095.0f * 3300.0f; // mV
    float tempUsedForPH = isnan(lastUploadedTemp) ? 25.0f : lastUploadedTemp;
    float phReading = ph.readPH(voltagePH, tempUsedForPH);
    float truepHValue = phReading - 0.8f;

    if (phValid) {
      Serial.printf("✅ pH Level: %.2f\n", truepHValue);
      lastUploadedPH = truepHValue;
    } else {
      Serial.println("⚠️ pH sensor disconnected or out of range.");
    }

    // ---------------- TURBIDITY ----------------
    int turbRaw = analogRead(TURBIDITY_SENSOR_PIN);
    bool turbidityValid = (turbRaw > 0);
    float turbVoltage = (float)turbRaw * (3.3f / 4095.0f);
    Serial.println(turbRaw);
    Serial.println(turbVoltage);

    String turbidityStatus;
    if (turbVoltage > 1.6f) turbidityStatus = "Clear";
    else if (turbVoltage > 1.4f) turbidityStatus = "Moderately Clear";
    else if (turbVoltage > 1.2f) turbidityStatus = "Murky";
    else turbidityStatus = "Very Murky";

    if (turbidityValid) {
      Serial.printf("✅ Turbidity: %s\n", turbidityStatus.c_str());
      lastUploadedTurbidity = turbidityStatus;
    } else {
      Serial.println("⚠️ Turbidity sensor disconnected or no signal.");
    }

    // ==================== SENSOR UPLOAD ====================
    if (Database1.set<float>(async_sensor, "/water_temperature", tempValid ? tempC : lastUploadedTemp))
      Serial.println("📤 Water temperature uploaded.");
    else
      Serial.println("⚠️ Failed to upload water temperature.");

    if (Database1.set<float>(async_sensor, "/ph_level", phValid ? truepHValue : lastUploadedPH))
      Serial.println("📤 pH level uploaded.");
    else
      Serial.println("⚠️ Failed to upload pH level.");

    if (Database1.set<String>(async_sensor, "/turbidity_status", turbidityValid ? turbidityStatus : lastUploadedTurbidity))
      Serial.println("📤 Turbidity status uploaded.");
    else
      Serial.println("⚠️ Failed to upload turbidity status.");

    delay(UPLOAD_STAGGER_MS / 2);

    // ==================== HEALTH-CHECK UPLOAD ====================
    if (Database1.set<bool>(async_sensor, "/health-check/water-temp", !tempValid))
      Serial.println("📤 Health-check: water-temp uploaded.");
    else
      Serial.println("⚠️ Failed to upload health-check: water-temp.");

    if (Database1.set<bool>(async_sensor, "/health-check/ph", !phValid))
      Serial.println("📤 Health-check: pH uploaded.");
    else
      Serial.println("⚠️ Failed to upload health-check: pH.");

    if (Database1.set<bool>(async_sensor, "/health-check/turbidity", !turbidityValid))
      Serial.println("📤 Health-check: turbidity uploaded.");
    else
      Serial.println("⚠️ Failed to upload health-check: turbidity.");

    // reset tempRequestTime to avoid repeated reads until next cycle
    tempRequestTime = 0;
  }
}

// ========================== FEEDER ==========================
void getFeederTimes() {
  static AsyncResult result;
  Serial.println("Fetching feeder times...");
  Database2.get(async_devices, "/feeder", result);
  app2.loop();

  if (result.isError()) {
    Serial.printf("Failed to get feeder data: %s\n", result.error().message().c_str());
    return;
  }
  if (!result.isResult()) {
    Serial.println("No feeder data found!");
    totalFeeds = 0;
    memset(feedHours, -1, sizeof(feedHours));
    memset(feedMinutes, -1, sizeof(feedMinutes));
    return;
  }

  String jsonStr = result.payload();
  FirebaseJson json;
  json.setJsonData(jsonStr);
  FirebaseJsonData data;

  totalFeeds = 0;
  memset(feedHours, -1, sizeof(feedHours));
  memset(feedMinutes, -1, sizeof(feedMinutes));
  for (int i = 0; i < 50; ++i) lastFedMinuteForIndex[i] = -1;

  size_t count = json.iteratorBegin();
  for (size_t i = 0; i < count; i++) {
    String key, value;
    int type = 0;
    json.iteratorGet(i, type, key, value);
    if (value == "null" || value.length() == 0) continue;

    FirebaseJson feederData;
    feederData.setJsonData(value);

    int hour = -1, min = -1;
    if (feederData.get(data, "/hour")) hour = data.intValue;
    if (feederData.get(data, "/min"))  min = data.intValue;

    if (hour >= 0 && min >= 0) {
      feedHours[totalFeeds] = hour;
      feedMinutes[totalFeeds] = min;
      Serial.printf("Feeder %d (Key: %s) → Hour: %d, Min: %d\n",
                    totalFeeds, key.c_str(), hour, min);
      totalFeeds++;
      if (totalFeeds >= 50) break;
    }
  }
  json.iteratorEnd();

  Serial.printf("✅ Total valid feeders: %d\n", totalFeeds);
}

void handleFeederLogic() {
  unsigned long now = millis();

  // Periodically refresh feeder schedule from Firebase
  if (now - lastFetchFeeders >= FETCH_FEEDERS_INTERVAL) {
    lastFetchFeeders = now;
    getFeederTimes();
  }

  // Non-blocking time check for scheduled feeding (NTP-based)
  struct tm timeinfo;
  if (getLocalTime(&timeinfo)) {
    int currentHour = timeinfo.tm_hour;
    int currentMinute = timeinfo.tm_min;
    int currentKey = currentHour * 60 + currentMinute;

    bool shouldFeedNow = false;
    for (int i = 0; i < totalFeeds; i++) {
      if (feedHours[i] < 0 || feedMinutes[i] < 0) continue;
      int feedKey = feedHours[i] * 60 + feedMinutes[i];
      if (currentKey == feedKey) {
        shouldFeedNow = true;
        break;
      }
    }

    if (shouldFeedNow && lastFedKey != currentKey) {
      Serial.printf("🐟 Feeding at %02d:%02d\n", currentHour, currentMinute);
      startServoFeedOnce();
      lastFedKey = currentKey;
    }

    if (lastFedKey != currentKey) {
      lastFedKey = -1; // reset when minute changes
    }
  }

  // Force-feed check (poll Firebase periodically)
  if (now - lastForceFeedPoll >= FORCE_FEED_POLL_MS) {
    lastForceFeedPoll = now;
    static AsyncResult ffResult;
    Database2.get(async_devices, "/actuator/feeder/force-feed", ffResult);
    app2.loop();
    if (!ffResult.isError() && ffResult.isResult()) {
      String ffValue = ffResult.payload();
      bool forceFeedFlag = (ffValue == "true" || ffValue == "1");
      static bool lastForceFeed = false;
      if (forceFeedFlag && !lastForceFeed) {
        Serial.println("🐟 Force feed triggered!");
        startServoFeedOnce();
        Database2.set<bool>(async_devices, "/actuator/feeder/force-feed", false);
      }
      lastForceFeed = forceFeedFlag;
    }
  }

  // Servo state machine non-blocking
  if (servoState == SERVO_OPENING && millis() - servoActionStart >= SERVO_OPEN_MS) {
    feederServo.write(SERVO_CLOSE_ANGLE);
    servoState = SERVO_IDLE;
    Serial.println("Servo closed (non-blocking).");
  }
}

void startServoFeedOnce() {
  if (servoState == SERVO_IDLE) {
    feederServo.write(SERVO_OPEN_ANGLE);
    servoState = SERVO_OPENING;
    servoActionStart = millis();
    Serial.println("Servo opened (non-blocking).");
  }
}

unsigned long nextChangeTimestamp = 0;

void fetchChangeSchedule(bool resetRunState) {
  static AsyncResult resultNext;
  static AsyncResult resultInterval;

  if (!app2.ready()) return;

  Serial.println("📡 Fetching water change schedule...");
  Database2.get(async_devices, "/change-schedule/next_run", resultNext);
  Database2.get(async_devices, "/change-schedule/interval_days", resultInterval);
  app2.loop();

  if (resultNext.isError() || resultInterval.isError()) {
    Serial.printf("⚠️ Failed to fetch schedule: %s\n", async_devices.lastError().message().c_str());
    return;
  }

  nextChangeTimestamp = resultNext.payload().toInt();
  intervalDays = resultInterval.payload().toFloat();

  if (intervalDays <= 0.0f || nextChangeTimestamp == 0) {
    Serial.println("🚫 Automation is OFF (no valid schedule).");
    nextChangeTimestamp = 0;
    intervalDays = 0;
    wcState = WC_IDLE;
    digitalWrite(PUMP_PIN, HIGH);
    digitalWrite(VALVE_PIN, HIGH);
    return;
  }

  if (resetRunState) {
    ranToday = false;
    lastRunMillis = 0;
  }

  Serial.printf("📅 Next change timestamp: %lu | Interval: %d days\n", nextChangeTimestamp, intervalDays);
}

// non-blocking water change state machine
void startWaterChange() {
  if (wcState == WC_IDLE && !manualOverride) {
    Serial.println("🚰 Starting water change...");
    wcState = WC_DRAINING;
    wcStageStart = millis();
    digitalWrite(VALVE_PIN, LOW);   // open valve (drain)
    digitalWrite(PUMP_PIN, HIGH);   // pump OFF initially
  }
}

void handleWaterChange() {
  unsigned long now = millis();

  switch (wcState) {
    case WC_DRAINING:
      digitalWrite(VALVE_PIN, LOW);
      digitalWrite(PUMP_PIN, HIGH);

      if (now - wcStageStart >= 25000UL) {  // 25 seconds drain
        digitalWrite(VALVE_PIN, HIGH); // close drain valve
        Serial.println("🧯 Drain complete, starting fill...");
        digitalWrite(PUMP_PIN, LOW); // pump ON to fill
        wcStageStart = now;
        wcState = WC_FILLING;
      }
      break;

    case WC_FILLING:
      if (now - wcStageStart >= 82000UL) {
        digitalWrite(PUMP_PIN, HIGH);  // stop pump
        Serial.println("✅ Water change complete (fixed duration)!");
        wcState = WC_IDLE;
        fetchChangeSchedule(false);
      } else {
        digitalWrite(PUMP_PIN, LOW);  // keep filling
      }
      break;

    case WC_IDLE:
    default:
      break;
  }
}

void checkWaterChange() {
  if (!app2.ready() || wcState != WC_IDLE || manualOverride) return;
  if (millis() - lastCheckWaterChange < WATER_CHANGE_CHECK_MS) return;
  lastCheckWaterChange = millis();

  if (nextChangeTimestamp == 0 || intervalDays == 0) {
    Serial.println("⏸ Automation OFF — skipping auto water change.");
    return;
  }

  unsigned long now = time(nullptr);
  if (now >= nextChangeTimestamp) {
    Serial.printf("🚰 It's time! (%lu >= %lu)\n", now, nextChangeTimestamp);
    startWaterChange();

    unsigned long newTimestamp = nextChangeTimestamp + (intervalDays * 24UL * 60UL * 60UL);

    bool success = Database2.set<unsigned long>(
      async_devices,
      "/change-schedule/next_run",
      newTimestamp
    );
    if (success)
      Serial.printf("🗓 Updated next water change to: %lu\n", newTimestamp);
    else
      Serial.println("⚠️ Failed to update next timestamp!");

    nextChangeTimestamp = newTimestamp;
  }
}

// update water level status to Firebase (only on change)
void updateWaterLevelStatus() {
  unsigned long now = millis();
  if (now - lastWaterLevelUpdate < WATER_LEVEL_UPDATE_MS) return;
  lastWaterLevelUpdate = now;

  static bool lastState = false;
  bool waterReached = (digitalRead(WATER_LEVEL) == WATER_DETECTED);
  if (waterReached != lastState) {
    lastState = waterReached;
    Serial.printf("📡 Water Level Changed: %s\n", waterReached ? "DETECTED" : "NOT DETECTED");
    Database2.set<bool>(async_devices, "/notifications/water-level", waterReached);
  }
}

// manual pump/valve control read from Firebase
void handleManualControl() {
  unsigned long now = millis();
  if (now - lastManualCtrlPoll < MANUAL_CTRL_POLL_MS) return;
  lastManualCtrlPoll = now;

  static AsyncResult pumpRes;
  static AsyncResult valveRes;
  Database2.get(async_devices, "/actuator/water-changer/pump", pumpRes);
  app2.loop();
  Database2.get(async_devices, "/actuator/water-changer/valve", valveRes);
  app2.loop();

  if (!pumpRes.isError() && !valveRes.isError() && pumpRes.isResult() && valveRes.isResult()) {
    String pumpPayload = pumpRes.payload();
    String valvePayload = valveRes.payload();

    bool pumpCmd = (pumpPayload == "true" || pumpPayload == "1");
    bool valveCmd = (valvePayload == "true" || valvePayload == "1");

    manualPump = pumpCmd;
    manualValve = valveCmd;
    manualOverride = manualPump || manualValve;

    bool waterReached = (digitalRead(WATER_LEVEL) == WATER_DETECTED);

    // Safety: stop manual pump if water reached
    if (manualPump) {
      if (waterReached) {
        digitalWrite(PUMP_PIN, HIGH);
        Serial.println("💧 Water detected — manual pump OFF for safety!");
        Database2.set<bool>(async_devices, "/actuator/water-changer/pump", false);
        manualPump = false;
      } else {
        digitalWrite(PUMP_PIN, LOW); // pump ON
      }
    } else {
      digitalWrite(PUMP_PIN, HIGH); // pump OFF
    }

    // manual valve
    digitalWrite(VALVE_PIN, manualValve ? LOW : HIGH);
  }
}
```

---

## 🔥 Firebase Configuration

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Realtime Database** and set rules to authenticated access.
3. Enable **Firebase Authentication** (email/password).
4. Download `google-services.json` (Android) or `GoogleService-Info.plist` (iOS) and place them in the appropriate directories:

```
android/app/google-services.json
ios/GoogleService-Info.plist
```

5. Create a `.env` file in the project root:

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

---

## 📲 SMS Notification Setup

The SMS notification system runs as a **separate Node.js worker** that listens to the Firebase Realtime Database for changes in water parameters. When values exceed the configured thresholds, the worker sends SMS alerts via the [iProgSMS](https://www.iprogsms.com/) API.

### Prerequisites

1. Register an account at [iprogsms.com](https://www.iprogsms.com/) and obtain your API token from the dashboard.
2. Download your **Firebase Service Account** JSON file from the [Firebase Console](https://console.firebase.google.com/) → Project Settings → Service Accounts → Generate New Private Key.

### Environment Variables

Create a `.env` file in the worker directory with the following variables:

```env
FIREBASE_SA_JSON=SERVICE_ACCOUNT
FIREBASE_DB_URL=DB_URL
SMS_ENDPOINT=IPROG_ENDPOINT
SMS_API_TOKEN=IPROG_TOKEN
SMS_PHONE_DEFAULT=NUMBER
ALERT_COOLDOWN_MIN=10
```

| Variable | Description |
|---|---|
| `FIREBASE_SA_JSON` | The full JSON content of your Firebase service account key (as a single-line string) |
| `FIREBASE_DB_URL` | Your Firebase Realtime Database URL (e.g. `https://your-project.firebaseio.com`) |
| `SMS_ENDPOINT` | The iProgSMS API endpoint (e.g. `https://sms.iprogtech.com/api/v1/sms_messages`) |
| `SMS_API_TOKEN` | Your iProgSMS API token |
| `SMS_PHONE_DEFAULT` | Default phone number to receive alerts (e.g. `+639XXXXXXXXX`) |
| `ALERT_COOLDOWN_MIN` | Cooldown period between alerts in minutes (default: `10`) |

### Running the Worker

```bash
# Install dependencies
npm install dotenv axios firebase-admin

# Start the worker
node worker.js
```

### Source Code

```js
require("dotenv").config();
const axios = require("axios");
const admin = require("firebase-admin");
const http = require("http");

// firebase admin init
const raw = process.env.FIREBASE_SA_JSON || "{}";
const sa = JSON.parse(raw);
if (typeof sa.private_key === "string") {
  sa.private_key = sa.private_key.replace(/\\n/g, "\n").trim();
}
admin.initializeApp({
  credential: admin.credential.cert(sa),
  databaseURL: process.env.FIREBASE_DB_URL,
});
const db = admin.database();

const DATA_REF_PATH = "/";

// cooldown 10 mins
const ALERT_COOLDOWN_MIN = Number(process.env.ALERT_COOLDOWN_MIN || 10);
const COOLDOWN_MS = ALERT_COOLDOWN_MIN * 60 * 1000;
let lastBroadcastAt = 0;
let cooldownInterval = null;

let thresholds = {
  ph: { min: 6.0, max: 8.0 },
  temp: { min: 0, max: 32 },
};

// sanitize messages to remove all unicode & emojis
function sanitizeMessage(msg) {
  return msg.normalize("NFKD").replace(/[^\x00-\x7F]/g, "");
}

function startCooldownTimer() {
  if (cooldownInterval) clearInterval(cooldownInterval);

  cooldownInterval = setInterval(async () => {
    const now = Date.now();
    const diff = now - (lastBroadcastAt || 0);

    if (diff >= COOLDOWN_MS) {
      console.log(`\n[RATE] Cooldown finished. Checking database again...`);
      clearInterval(cooldownInterval);
      cooldownInterval = null;

      // re-check values after cooldown
      await evaluateAndSendCombined("cooldown_expired");
    } else {
      const left = Math.ceil((COOLDOWN_MS - diff) / 1000);
      const min = Math.floor(left / 60);
      const sec = left % 60;
      process.stdout.write(`\r[RATE] Next alert available in ${min}m ${sec}s   `);
    }
  }, 1000);
}

function canBroadcast() {
  const now = Date.now();
  const diff = now - (lastBroadcastAt || 0);
  if (diff < COOLDOWN_MS) {
    return false;
  }
  lastBroadcastAt = now; // reserve immediately
  startCooldownTimer();
  return true;
}

// sms sender POST
async function sendSms({ phone, message }) {
  const base = process.env.SMS_ENDPOINT;
  const token = process.env.SMS_API_TOKEN;

  // always clean the message before sending
  const cleanMsg = sanitizeMessage(message);

  const url = new URL(base);
  url.searchParams.set("api_token", token);
  url.searchParams.set("message", cleanMsg);
  url.searchParams.set("phone_number", phone);

  const res = await axios.post(url.toString(), null, {
    timeout: 15000,
    validateStatus: () => true,
  });

  console.log("\n[SMS] status:", res.status, "data:", res.data);
  if (res.status >= 400) throw new Error(`SMS provider error ${res.status}`);
  return res.data;
}

function phoneFor() {
  return process.env.SMS_PHONE_DEFAULT;
}

function phIssue(v) {
  const n = Number(v);
  if (Number.isNaN(n)) return null;
  if (n < thresholds.ph.min || n > thresholds.ph.max)
    return `pH ${n} (allowed ${thresholds.ph.min}-${thresholds.ph.max})`;
  return null;
}

function tempIssue(t) {
  const n = Number(t);
  if (Number.isNaN(n)) return null;
  if (n < thresholds.temp.min || n > thresholds.temp.max)
    return `Temperature ${n}°C (allowed ${thresholds.temp.min}-${thresholds.temp.max}°C)`;
  return null;
}

function turbidityIssue(s) {
  const raw = String(s ?? "").trim();
  const v = raw.toLowerCase();
  if (v === "murky" || v === "very murky") return `Turbidity ${raw}`;
  return null;
}

// build a single combined message for all issues
function composeCombinedAlert(data) {
  const issues = [];
  const ph = phIssue(data.ph_level);
  if (ph) issues.push({ type: "ph", text: ph, value: data.ph_level });

  const temp = tempIssue(data.water_temperature);
  if (temp) issues.push({ type: "water_temperature", text: temp, value: data.water_temperature });

  const turb = turbidityIssue(data.turbidity_status);
  if (turb) issues.push({ type: "turbidity", text: turb, value: data.turbidity_status });

  if (issues.length === 0) return null;

  const timestamp = new Date().toLocaleString("en-PH", { timeZone: "Asia/Manila" });

  return {
    message: `ALERT: Water thresholds exceeded (${timestamp})\n- ${issues.map(i => i.text).join("\n- ")}`,
    issues,
  };
}

// reads full snapshot, composes, sends once
async function evaluateAndSendCombined(reason = "unknown") {
  const snap = await db.ref(DATA_REF_PATH).get();
  const data = snap.val() || {};

  const alert = composeCombinedAlert(data);
  if (!alert) {
    console.log("[EVAL] No issues detected; nothing to send.");
    return;
  }

  if (!canBroadcast()) return;

  try {
    // send sms
    await sendSms({ phone: phoneFor(), message: alert.message });

    // firebase log
    const now = new Date();
    const timestamp = Date.now();
    const logEntry = {
      time: now.toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit", hour12: true }),
      day: now.getDate(),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    };

    for (const issue of alert.issues) {
      const entry = { ...logEntry, value: issue.value };
      await db.ref(`notifications/${issue.type}/${timestamp}`).set(entry);
      console.log(`[DB] Logged ${issue.type} issue →`, entry);
    }
  } catch (err) {
    lastBroadcastAt = 0;
    console.error("[EVAL] SMS error:", err.response?.status, err.response?.data || err.message);
  }
}

// threshold listeners
db.ref("parameter_range/ph_range").on("value", (snap) => {
  const val = snap.val();
  if (val) {
    thresholds.ph = { min: Number(val.min), max: Number(val.max) };
    console.log("[THRESHOLDS] Updated pH range:", thresholds.ph);
  }
});

db.ref("parameter_range/temp_range").on("value", (snap) => {
  const val = snap.val();
  if (val) {
    thresholds.temp = { min: Number(val.min), max: Number(val.max) };
    console.log("[THRESHOLDS] Updated Temp range:", thresholds.temp);
  }
});

// listeners
db.ref(DATA_REF_PATH).on("child_changed", async (snap) => {
  await evaluateAndSendCombined(`change:${snap.key}`);
});

// run once at startup
db.ref(DATA_REF_PATH).once("value").then(async () => {
  await evaluateAndSendCombined("startup");
});

http.createServer((_, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("ok");
}).listen(process.env.PORT || 3000, () => console.log("Worker running"));
```

SMS alerts are triggered automatically when:
   - pH drops below or exceeds the configured safe range
   - Water temperature reaches a critical threshold
   - Turbidity indicates dangerously cloudy water

---

## 🤝 Contributing

Contributions are welcome. To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

> Built by [Joshua Ian Cadiz](https://github.com/joshiancadiz) — Front-End Software Engineer
