import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

export default function RootLayout() {
  const [isFeederModalVisible, setFeederModalVisible] = useState(false);
  const [isWaterModalVisible, setWaterModalVisible] = useState(false);
  const [isLogsModalVisible, setLogsModalVisible] = useState(false);
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);

  return (
    <>
      <StatusBar style="auto" />
      <Tabs
        screenOptions={{
          tabBarStyle: { height: 120, paddingTop: 20 },
          headerTitleStyle: { fontSize: 16 },
          headerTitleAlign: "center",
        }}
      >
        {/* ====================== ALERT LOGS TAB ====================== */}
        <Tabs.Screen
          name="logs"
          options={{
            title: "Alert Logs",
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="bell" size={size} color={color} />
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => setLogsModalVisible(true)}
                style={{ marginRight: 25 }}
              >
                <Feather name="info" size={24} color="#007AFF" />
              </TouchableOpacity>
            ),
          }}
        />

        {/* ====================== FISH FEEDER TAB ====================== */}
        <Tabs.Screen
          name="feeder"
          options={{
            title: "Fish Feeder",
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="basket-fill" size={30} color={color} />
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => setFeederModalVisible(true)}
                style={{ marginRight: 25 }}
              >
                <Feather name="info" size={24} color="#007AFF" />
              </TouchableOpacity>
            ),
          }}
        />

        {/* ====================== PARAMETER MONITORING TAB ====================== */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Parameter Monitoring",
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6
                name="temperature-three-quarters"
                size={size}
                color={color}
              />
            ),
          }}
        />

        {/* ====================== WATER CHANGER TAB ====================== */}
        <Tabs.Screen
          name="water-change"
          options={{
            title: "Water Changer",
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <SimpleLineIcons name="drop" size={size} color={color} />
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => setWaterModalVisible(true)}
                style={{ marginRight: 25 }}
              >
                <Feather name="info" size={24} color="#007AFF" />
              </TouchableOpacity>
            ),
          }}
        />

        {/* ====================== PROFILE & SETTINGS TAB ====================== */}
        <Tabs.Screen
          name="user"
          options={{
            title: "Parameter Settings",
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <Feather name="user" size={size} color={color} />
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => setProfileModalVisible(true)}
                style={{ marginRight: 25.3 }}
              >
                <Feather name="info" size={24} color="#007AFF" />
              </TouchableOpacity>
            ),
          }}
        />
      </Tabs>

      {/* ====================== ALERT LOGS MODAL ====================== */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isLogsModalVisible}
        onRequestClose={() => setLogsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Alert Logs</Text>
            <Text style={{ textAlign: "center", fontSize: 16 }}>
              {"\n"}This section allows you to review past alerts and records of parameter changes. It provides a history of important water quality updates such as pH, temperature, and turbidity variations.
            </Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setLogsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ====================== FISH FEEDER MODAL ====================== */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isFeederModalVisible}
        onRequestClose={() => setFeederModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>How to Use Fish Feeder</Text>
            <Text style={styles.modalText}>
              <Text style={{ fontWeight: "bold" }}>Scheduled Feeding</Text>
              {"\n"}Press the “+” sign to add a feeding schedule; the feeder will automatically dispense food at the set time.
              {"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Manual Feeding</Text>
              {"\n"}Tap the “Feeds” button to instantly release food.
            </Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setFeederModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ====================== WATER CHANGER MODAL ====================== */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isWaterModalVisible}
        onRequestClose={() => setWaterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>How to Use Water Changer</Text>
            <Text style={styles.modalText}>
              <Text style={{ fontWeight: "bold" }}>Scheduled Change</Text>
              {"\n"}Press the “Save” button after selecting an interval and time; water will automatically change at the set schedule.
              {"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Manual Change</Text>
              {"\n"}Tap the “Drain ON/OFF” or “Refill ON/OFF” buttons to manually control water flow.
            </Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setWaterModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ====================== PROFILE & SETTINGS MODAL ====================== */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isProfileModalVisible}
        onRequestClose={() => setProfileModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Parameter Settings</Text>
            <Text style={styles.modalText}>
              Customize and manage water quality parameter ranges for your aquarium. You can adjust temperature and pH thresholds, use fish type presets for automatic settings.
            </Text>


            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setProfileModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    width: "85%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#333",
  },
  closeButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 20,
  },
  closeButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
