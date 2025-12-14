import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { database, ref, onValue } from "../../firebaseConfig";
import { Picker } from "@react-native-picker/picker";

// define log data type
interface LogItem {
  id: string;
  day: number;
  month: number;
  year: number;
  time: string;
  value: number | string;
  message?: string;
}

export default function Temp() {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<"today" | "month" | "year">(
    "today"
  );

  useEffect(() => {
    // reference to notifications/water_temperature
    const dbRef = ref(database, "notifications/water_temperature");

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const fetchedData = snapshot.val();
        // Convert object to array
        const formattedData: LogItem[] = Object.entries(fetchedData).map(
          ([id, value]: [string, any]) => ({
            id,
            ...value,
          })
        );

        setLogs(formattedData);
      } else {
        setLogs([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // filtering based on picker
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1; // months are 0-based
  const currentYear = today.getFullYear();

  const filteredLogs = logs.filter((item) => {
    if (selectedItem === "today") {
      return (
        item.day === currentDay &&
        item.month === currentMonth &&
        item.year === currentYear
      );
    } else if (selectedItem === "month") {
      return item.month === currentMonth && item.year === currentYear;
    } else if (selectedItem === "year") {
      return item.year === currentYear;
    }
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.pickerCont}>
              <Picker
              style={styles.picker}
              mode="dropdown"
              selectedValue={selectedItem}
              onValueChange={(itemValue) =>
                setSelectedItem(itemValue as "today" | "month" | "year")
              }
            >
              <Picker.Item label="Today" value="today" />
              <Picker.Item label="Month" value="month" />
              <Picker.Item label="Year" value="year" />
            </Picker>
            </View>

      <FlatList showsVerticalScrollIndicator={false}
        data={filteredLogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.textCont}>
            <Text style={styles.date}>
              {item.month}/{item.day}/{item.year}
            </Text>
            <Text style={styles.time}>
              {item.time}
            </Text>
            </View>
            <Text style={styles.message}>Temperature out of range: <Text style={styles.value}>{item.value}°C</Text></Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, width: "90%", height: "100%" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  pickerCont : {
    width: "60%",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#cbc9c9ff",
    borderRadius: 10,
    paddingHorizontal: 5,
    height: 50,
    justifyContent: "center"
  },
  picker: {
    width: "100%",
  },
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textCont: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10},
  date: { fontSize: 14, fontWeight: "500", marginBottom: 5 },
  time: { fontSize: 14, fontWeight: "500", marginBottom: 5 },
  value: { fontSize: 13, color: "red", marginBottom: 5 },
  message: { fontSize: 13}
});
