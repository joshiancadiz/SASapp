import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Ph from "./pH";
import Temp from "./temp";
import Turbidity from "./turb";

type LogsProps = {};

export default function Logs({}: LogsProps) {
  const [selectedParameter, setSelectedParameter] = useState<
    "water-temperature" | "ph-level" | "turbidity"
  >("water-temperature");

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.button1,
              selectedParameter === "water-temperature" && styles.activeButton,
            ]}
            onPress={() => setSelectedParameter("water-temperature")}
          >
            <Text
              style={[
                styles.textButton,
                selectedParameter === "water-temperature" && styles.activeText,
              ]}
            >
              Water Temp
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.button2,
              selectedParameter === "ph-level" && styles.activeButton,
            ]}
            onPress={() => setSelectedParameter("ph-level")}
          >
            <Text
              style={[
                styles.textButton,
                selectedParameter === "ph-level" && styles.activeText,
              ]}
            >
              pH Level
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.button3,
              selectedParameter === "turbidity" && styles.activeButton,
            ]}
            onPress={() => setSelectedParameter("turbidity")}
          >
            <Text
              style={[
                styles.textButton,
                selectedParameter === "turbidity" && styles.activeText,
              ]}
            >
              Turbidity
            </Text>
          </TouchableOpacity>
        </View>

        {/* Conditional rendering */}
        {selectedParameter === "water-temperature" ? (
          <Temp />
        ) : selectedParameter === "ph-level" ? (
          <Ph />
        ) : selectedParameter === "turbidity" ? (
          <Turbidity />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    width: "100%",
  },
  content: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
    height: "100%",
  },
  buttons: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "33.3%",
    alignItems: "center",
    borderWidth: 1,
    paddingVertical: 7,
    borderColor: "#4293f5",
  },
  textButton: {
    fontSize: 12,
    color: "#000",
  },
  button1: {
    borderRightWidth: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  button2: {
    borderRightWidth: 0,
  },
  button3: {
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  activeButton: {
    backgroundColor: "#4293f5",
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
