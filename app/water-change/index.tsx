import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { ref, set, onValue, get, DatabaseReference } from "firebase/database";
import { database } from "../../firebaseConfig";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

export default function WaterControl() {
  const [pumpOn, setPumpOn] = useState(false);
  const [valveOn, setValveOn] = useState(false);
  const [intervalDays, setIntervalDays] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showDate, setShowDate] = useState("");

  // 🔹 Sync pump state
  useEffect(() => {
    const pumpRef = ref(database, "actuator/water-changer/pump");
    const unsubscribe = onValue(pumpRef, (snapshot) => {
      if (snapshot.exists()) setPumpOn(snapshot.val());
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Sync valve state
  useEffect(() => {
    const valveRef = ref(database, "actuator/water-changer/valve");
    const unsubscribe = onValue(valveRef, (snapshot) => {
      if (snapshot.exists()) setValveOn(snapshot.val());
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Load schedule from Firebase
useEffect(() => {
  const scheduleRef = ref(database, "/change-schedule");

  const unsubscribe = onValue(scheduleRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();

      if (data.interval_days !== undefined)
        setIntervalDays(data.interval_days);

      // 🔸 If automation is off
      if (data.interval_days === 0 || data.interval_days === 100) {
        setShowDate("Automation is off");
        return;
      }

      // 🔹 If you saved next_run as Unix timestamp (seconds)
      if (data.next_run) {
        const nextDate = new Date(data.next_run * 1000); // convert seconds → ms
        setShowDate(
          nextDate.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        );
      } else {
        setShowDate("No schedule set");
      }

      // Optional: still support old hour/minute fields if present
      if (
        data.hour !== undefined &&
        data.minute !== undefined &&
        data.hour !== 100 &&
        data.minute !== 100
      ) {
        const time = new Date();
        time.setHours(data.hour);
        time.setMinutes(data.minute);
        setSelectedTime(time);
      }
    } else {
      setShowDate("No schedule found");
    }
  });

  return () => unsubscribe();
}, []);


  // 🔹 Toggle Pump (with water-level check)
  const togglePump = async () => {
    try {
      const levelRef: DatabaseReference = ref(database, "notifications/water-level");
      const snapshot = await get(levelRef);

      // 🚫 If tank is full and user tries to turn ON pump
      if (!pumpOn && snapshot.exists() && snapshot.val() === true) {
        Alert.alert("💧 Water Tank Full", "Refill not allowed, the tank is already full.");
        return;
      }

      // ✅ Otherwise, toggle normally
      const newState = !pumpOn;
      await set(ref(database, "actuator/water-changer/pump"), newState);
      setPumpOn(newState);
    } catch (error) {
      console.error("Error toggling pump:", error);
      Alert.alert("Error", "Failed to toggle pump.");
    }
  };

  // 🔹 Toggle Valve
  const toggleValve = async () => {
    const newState = !valveOn;
    await set(ref(database, "actuator/water-changer/valve"), newState);
    setValveOn(newState);
  };

  // 🔹 Handle time change
  const handleTimeChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (event.type === "set" && selectedDate) {
      setSelectedTime(selectedDate);
      setShowPicker(false);
    } else {
      setShowPicker(false);
    }
  };

 // 🔹 Save schedule to Firebase
const saveSchedule = async () => {
  const scheduleRef = ref(database, "/change-schedule");

  // If "Off" selected
  if (intervalDays === 0 || intervalDays === 100) {
    await set(scheduleRef, {
      interval_days: intervalDays,
      next_run: null,
    });
    setShowDate("Automation is off"); // 👈 instantly show this
    Alert.alert("Schedule Set to OFF", "Automatic water change is disabled.");
    return;
  }

  // Get user-selected time
  const hour = selectedTime.getHours();
  const minute = selectedTime.getMinutes();

  // Current date & time
  const now = new Date();

  // Create a target date (today with chosen time)
  const target = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
    minute,
    0,
    0
  );

  // Add intervalDays
  const future = new Date(target.getTime() + intervalDays * 24 * 60 * 60 * 1000);

  // Convert to Unix timestamp (seconds)
  const unixTimestamp = Math.floor(future.getTime() / 1000);

  await set(scheduleRef, {
    interval_days: intervalDays,
    next_run: unixTimestamp,
  });

  setShowDate(
    future.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  );

  Alert.alert("Success", `Next water change set for ${future.toLocaleString()}`);
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Automated Control</Text>

      <View style={styles.automatedContainer}>
        <View style={styles.pickerCont}>
          <Picker
            mode="dropdown"
            style={styles.picker}
            selectedValue={intervalDays}
            onValueChange={(value) => setIntervalDays(value)}
          >
            <Picker.Item label="Off" value={0} />
            <Picker.Item label="Every 12 hours" value={0.5} />
            <Picker.Item label="Every day" value={1} />
            <Picker.Item label="Every 3 days" value={3} />
            <Picker.Item label="Every 7 days" value={7} />
            <Picker.Item label="Every 14 days" value={14} />
            <Picker.Item label="Every 28 days" value={28} />
          </Picker>
        </View>

        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.timeButtonText}>
            {selectedTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            is24Hour={false}
            display="spinner"
            onChange={handleTimeChange}
          />
        )}
      </View>
      <Text style={styles.showDate}>Next Change: {showDate}</Text>
      <TouchableOpacity style={styles.saveButton} onPress={saveSchedule}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Manual Control</Text>

      {/* Pump button */}
      <TouchableOpacity
        style={[styles.button, pumpOn ? styles.on : styles.off]}
        onPress={() =>
          Alert.alert(
            "Confirm Action",
            pumpOn
              ? "Are you sure you want to turn OFF the pump?"
              : "Are you sure you want to turn ON the pump?",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Yes", onPress: togglePump },
            ]
          )
        }
      >
        <Text style={styles.buttonText}>
          {pumpOn ? "Refill OFF" : "Refill ON"}
        </Text>
      </TouchableOpacity>

      {/* Valve button */}
      <TouchableOpacity
        style={[styles.button, valveOn ? styles.on : styles.off]}
        onPress={() =>
          Alert.alert(
            "Confirm Action",
            valveOn
              ? "Are you sure you want to turn OFF the valve?"
              : "⚠️ Warning! Make sure the tank is empty before doing this action, are you sure you want to turn ON the valve?",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Yes", onPress: toggleValve },
            ]
          )
        }
      >
        <Text style={styles.buttonText}>
          {valveOn ? "Drain OFF" : "Drain ON"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-start", padding: 25 },
  automatedContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  title: {
    color: "#848484ff",
    fontWeight: "500",
    marginBottom: 10,
    textAlign: "left",
  },
  picker: { width: "100%" },
  pickerCont: {
    width: "65%",
    borderWidth: 1,
    borderColor: "#cbc9c9ff",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
  },
  timeButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  timeButtonText: { fontSize: 16, color: "#333" },
  showDate: { fontSize: 12, color: "#848484ff", marginBottom: 15 },
  saveButton: {
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    height: 50,
    marginBottom: 50,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  off: { backgroundColor: "#007bff" },
  on: { backgroundColor: "#F44336" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
