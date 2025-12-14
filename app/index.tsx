import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { database, ref, onValue } from "../firebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import * as Haptics from "expo-haptics";

export default function WaterMonitoring() {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [ph, setPh] = useState<number | null>(null);
  const [turbidityStatus, setTurbidityStatus] = useState<string | null>(null);

  const [phError, setPhError] = useState(false);
  const [tempError, setTempError] = useState(false);
  const [turbError, setTurbError] = useState(false);

  const hasWarnedTemp = useRef(false);
  const hasWarnedPh = useRef(false);
  const hasWarnedTurb = useRef(false);

  const latestTemp = useRef<number | null>(null);
  const latestPh = useRef<number | null>(null);
  const latestTurb = useRef<string | null>(null);

  const [tempRange, setTempRange] = useState<{ min: number; max: number } | null>(null);
  const [phRange, setPhRange] = useState<{ min: number; max: number } | null>(null);

  const [modalVisible, setModalVisible] = useState(false);

  const showAlert = async (title: string, message: string): Promise<void> => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  };

  const checkAndNotify = async (
    temp: number | null,
    phLevel: number | null,
    turbidity: string | null
  ): Promise<void> => {
    if (!tempRange || !phRange) return;
    const alerts: { title: string; message: string }[] = [];

    if (temp !== null) {
      if (temp < tempRange?.min || temp > tempRange?.max) {
        if (!hasWarnedTemp.current) {
          alerts.push({
            title: "⚠️ Temperature Alert",
            message: `Temperature is out of range: ${temp}°C`,
          });
          hasWarnedTemp.current = true;
        }
      } else {
        hasWarnedTemp.current = false;
      }
    }

    if (phLevel !== null) {
      if (phLevel < phRange?.min || phLevel > phRange?.max) {
        if (!hasWarnedPh.current) {
          alerts.push({
            title: "⚠️ pH Alert",
            message: `pH level is out of range: ${phLevel}`,
          });
          hasWarnedPh.current = true;
        }
      } else {
        hasWarnedPh.current = false;
      }
    }

    if (turbidity !== null) {
      if (turbidity === "Murky" || turbidity === "Very Murky") {
        if (!hasWarnedTurb.current) {
          alerts.push({
            title: "⚠️ Turbidity Alert",
            message: `Water is ${turbidity}`,
          });
          hasWarnedTurb.current = true;
        }
      } else {
        hasWarnedTurb.current = false;
      }
    }

    for (const a of alerts) {
      await showAlert(a.title, a.message);
    }
  };

  const checkAll = (): void => {
    if (
      latestTemp.current !== null &&
      latestPh.current !== null &&
      latestTurb.current !== null
    ) {
      checkAndNotify(latestTemp.current, latestPh.current, latestTurb.current);
    }
  };

  useEffect(() => {
    const tempRef = ref(database, "water_temperature");
    const phRef = ref(database, "ph_level");
    const turbRef = ref(database, "turbidity_status");
    const tempRangeRef = ref(database, "parameter_range/temp_range");
    const phRangeRef = ref(database, "parameter_range/ph_range");

    const unsubscribeTempRange = onValue(tempRangeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setTempRange({ min: data.min, max: data.max });
    });

    const unsubscribePhRange = onValue(phRangeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setPhRange({ min: data.min, max: data.max });
    });

    const unsubscribeTemp = onValue(tempRef, (snapshot) => {
      const value = snapshot.val() as number;
      setTemperature(value);
      latestTemp.current = value;
      checkAll();
    });

    const unsubscribePh = onValue(phRef, (snapshot) => {
      const value = snapshot.val() as number;
      setPh(value);
      latestPh.current = value;
      checkAll();
    });

    const unsubscribeTurb = onValue(turbRef, (snapshot) => {
      const value = snapshot.val() as string;
      setTurbidityStatus(value);
      latestTurb.current = value;
      checkAll();
    });

    const phHealthRef = ref(database, "health-check/ph");
    const tempHealthRef = ref(database, "health-check/water-temp");
    const turbHealthRef = ref(database, "health-check/turbidity");

    const unsubscribePhHealth = onValue(phHealthRef, (snapshot) => {
      setPhError(snapshot.exists() && snapshot.val() === true);
    });

    const unsubscribeTempHealth = onValue(tempHealthRef, (snapshot) => {
      setTempError(snapshot.exists() && snapshot.val() === true);
    });

    const unsubscribeTurbHealth = onValue(turbHealthRef, (snapshot) => {
      setTurbError(snapshot.exists() && snapshot.val() === true);
    });

    return () => {
      unsubscribeTemp();
      unsubscribePh();
      unsubscribeTurb();
      unsubscribeTempRange();
      unsubscribePhRange();
      unsubscribePhHealth();
      unsubscribeTempHealth();
      unsubscribeTurbHealth();
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Info Button */}
      <TouchableOpacity
        style={styles.questionButton}
        onPress={() => setModalVisible(true)}
      >
        <Feather name="info" size={24} color="#007AFF" />
      </TouchableOpacity>

      <Modal
  animationType="fade"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalView}>
      <Text style={styles.modalTitle}>Water Quality Parameters</Text>

      {/* Temperature */}
      <View style={styles.infoSection}>
        <FontAwesome6 name="temperature-three-quarters" size={25} color="red" />
        <Text style={styles.modalText}>
          <Text style={{ fontWeight: "bold" }}>Temperature </Text>
          affects fish metabolism and oxygen levels. Maintaining it within range keeps fish healthy.
        </Text>
      </View>

      {/* pH Level */}
      <View style={styles.infoSection}>
        <Ionicons name="water" size={25} color="#0388fc" />
        <Text style={styles.modalText}>
          <Text style={{ fontWeight: "bold" }}>pH Level </Text>
          indicates the acidity or alkalinity of water. Stable pH prevents stress and supports biological balance.
        </Text>
      </View>

      {/* Turbidity */}
      <View style={styles.infoSection}>
        <Entypo name="air" size={25} color="#555" />
        <Text style={styles.modalText}>
          <Text style={{ fontWeight: "bold" }}>Turbidity </Text>
           measures water clarity. High turbidity can block light and harm aquatic life.
        </Text>
      </View>

      {/* Close button */}
      <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
        <Text style={styles.closeButtonText}>Close</Text>
      </Pressable>
    </View>
  </View>
  </Modal>



      {/* Temperature */}
      <View style={styles.parCont}>
        <View style={styles.iconLabel}>
          <FontAwesome6 name="temperature-three-quarters" size={35} color="red" />
          <Text style={styles.label}>Water Temperature:</Text>
        </View>
        <Text
          style={[
            styles.value,
            temperature !== null &&
            tempRange !== null &&
            (temperature < tempRange.min || temperature > tempRange.max)
              ? { color: "red" }
              : { color: "black" },
          ]}
        >
          {temperature !== null ? `${temperature} °C` : "Loading..."}
        </Text>
        {tempError && (
          <Text style={styles.errorText}>⚠️ Sensor Error: Sensor malfunctioned.</Text>
        )}
      </View>

      {/* pH */}
      <View style={styles.parCont}>
        <View style={styles.iconLabel}>
          <Ionicons name="water" size={35} color="#0388fc" />
          <Text style={styles.label}>pH Level:</Text>
        </View>
        <Text
          style={[
            styles.value,
            ph !== null &&
            phRange !== null &&
            (ph < phRange.min || ph > phRange.max)
              ? { color: "red" }
              : { color: "black" },
          ]}
        >
          {ph !== null ? ph.toFixed(2) : "Loading..."}
        </Text>
        {phError && (
          <Text style={styles.errorText}>⚠️ Sensor Error: Sensor malfunctioned.</Text>
        )}
      </View>

      {/* Turbidity */}
      <View style={styles.parCont}>
        <View style={styles.iconLabel}>
          <Entypo name="air" size={24} color="black" />
          <Text style={styles.label}>Turbidity:</Text>
        </View>
        <Text
          style={[
            styles.value,
            turbidityStatus === "Murky" || turbidityStatus === "Very Murky"
              ? { color: "red" }
              : { color: "black" },
          ]}
        >
          {turbidityStatus !== null ? turbidityStatus : "Loading..."}
        </Text>
        {turbError && (
          <Text style={styles.errorText}>⚠️ Sensor Error: Sensor malfunctioned.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 30,
    marginTop: 30,
    backgroundColor: "#f5f5f5",
  },
  label: { fontSize: 20, fontWeight: "600" },
  questionButton: {
    position: "absolute",
    right: 25,
    top: -74.5,
    zIndex: 10,
  },
  modalOverlay: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
},
modalView: {
  backgroundColor: "white",
  borderRadius: 15,
  padding: 25,
  width: "85%",
  alignItems: "center",
  elevation: 10,
},
modalTitle: {
  fontSize: 20,
  fontWeight: "700",
  marginBottom: 20,
  color: "#222",
},
infoSection: {
  alignItems: "center",
  marginBottom: 25,
  gap: 10,
},
modalText: {
  textAlign: "center",
  fontSize: 15,
  color: "#444",
  lineHeight: 22,
},
closeButton: {
  backgroundColor: "#0388fc",
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 40,
  marginTop: 10,
  width: "100%"
},
closeButtonText: {
  color: "white",
  fontWeight: "600",
  fontSize: 16,
  textAlign: "center"
},
  value: {
    fontSize: 28,
    fontWeight: "500",
    marginTop: 10,
    marginLeft: 10,
  },
  parCont: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    elevation: 8,
    width: "85%",
    minHeight: 110,
  },
  iconLabel: { flexDirection: "row", alignItems: "center", gap: 10 },
  errorText: {
    color: "red",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 5,
  },
});
