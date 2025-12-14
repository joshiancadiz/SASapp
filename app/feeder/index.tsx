import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, Text, ListRenderItem, Alert } from "react-native";
import { FAB, Card } from "react-native-paper";
import DateTimePicker, { DateTimePickerEvent, } from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { database } from "../../firebaseConfig";
import { ref, onValue, remove, DataSnapshot, } from "firebase/database";

type Alarm = {
  id: string;
  time: string; // now stored as "HH:mm"
};

export default function Feeder() {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());

  const alarmsRef = ref(database, "/feeder");

  // fetch alarms from db in real-time
 useEffect(() => {
  const unsubscribe = onValue(alarmsRef, (snapshot: DataSnapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const loadedAlarms: Alarm[] = Object.keys(data).map((key) => {
        const item = data[key];
        const hour = item?.hour ?? 0;
        const min = item?.min ?? 0;
        return {
          id: key,
          time: `${hour.toString().padStart(2, "0")}:${min
            .toString()
            .padStart(2, "0")}`,
        };
      });

      loadedAlarms.sort((a, b) => (a.time > b.time ? 1 : -1));
      setAlarms(loadedAlarms);
    } else {
      setAlarms([]);
    }
  });

  return () => unsubscribe();
}, []);


  // format time display to 12-hour format
  const formatTime = (time: string): string => {
    const [hour, minute] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // add a new alarm to db
const handleTimeChange = async (
  event: DateTimePickerEvent,
  date?: Date
): Promise<void> => {
  setShowPicker(false);

  if (event.type === "dismissed" || !date) return;

  const hour = date.getHours();
  const minute = date.getMinutes();

  // fetch current feeder data to calculate next ID
  const snapshot = await import("firebase/database").then(({ get }) =>
    get(alarmsRef)
  );
  const data = snapshot?.val() || {};

  // get numeric IDs
  const ids = Object.keys(data)
    .map((key) => parseInt(key))
    .filter((num) => !isNaN(num));

  // prevent adding if 10 schedules already exist
  if (ids.length >= 10) {
    Alert.alert("Maximum Limit", "Maximum of 10 schedules only");
    return;
  }

  // get next ID
  const nextId = ids.length > 0 ? Math.max(...ids) + 1 : 0;

  // write new feeder node with numeric ID
  await import("firebase/database").then(({ set, ref }) =>
    set(ref(database, `/feeder/${nextId}`), { hour, min: minute })
  );
};


  // Delete alarm from db
  const handleDelete = async (id: string): Promise<void> => {
    await remove(ref(database, `/feeder/${id}`));
  };

  // force feed handler
const handleForceFeed = async (): Promise<void> => {
  try {
    await import("firebase/database").then(({ set, ref }) =>
      set(ref(database, "/actuator/feeder/force-feed"), true)
    );
    // Alert.alert("Force Feed", "Fish feeder triggered!");
  } catch (error) {
    console.error("Force feed error:", error);
    Alert.alert("Error", "Failed to trigger force feed.");
  }
};


  // render each alarm card
  const renderAlarm: ListRenderItem<Alarm> = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View>
          <Text style={styles.timeText}>{formatTime(item.time)}</Text>
          <Text style={styles.label}>Feeding Schedule</Text>
        </View>
        <TouchableOpacity onPress={() =>
          Alert.alert(
        "Delete Schedule",
        "Are you sure you want to delete this feeding schedule?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "OK", onPress: () => handleDelete(item.id) },
        ]
      )}>
          <Ionicons name="trash-outline" size={22} color="#ff4d4d" />
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={alarms}
        keyExtractor={(item) => item.id}
        renderItem={renderAlarm}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No feeding time set yet</Text>
        }
      />

      {/* Floating Add Button */}
      <FAB
        style={styles.fab}
        icon="plus"
        color="#fff"
        onPress={() => setShowPicker(true)}
      />

      {/* Floating Add Button */}
      <FAB
        style={styles.fab2}
        icon="basket-fill"
        color="#fff"
        onPress={() =>
          Alert.alert(
        "Force Feed",
        "Are you sure you want to dispence feeds?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "OK", onPress: () => handleForceFeed() },
        ]
      )}
      />

      {/* Time Picker */}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
    backgroundColor: "#f5f5f5",
  },
  list: {
    marginTop: 30,
    gap: 10,
    width: "100%",
    paddingBottom: 120
  },
  card: {
    marginBottom: 8,
    borderRadius: 16,
    width: "85%",
    alignSelf: "center",
    backgroundColor: "#fff"
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#888",
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 24,
    backgroundColor: "#007bff",
  },
  fab2: {
    position: "absolute",
    right: 90,
    bottom: 24,
    backgroundColor: "#007bff",
  }
});
