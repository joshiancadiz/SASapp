import React, { useEffect, useState } from "react";
import { ImageBackground, View, StyleSheet, TouchableOpacity, Text, TextInput, ScrollView } from "react-native";
import { database } from "../../firebaseConfig";
import { ref, onValue, update, } from "firebase/database";
import { Alert } from "react-native";

export default function User() {

   // state for ph range
  const [phMin, setPhMin] = useState("");
  const [phMax, setPhMax] = useState("");

  // state for temp range
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");

  // preset value for db
  const presets = {
  default: { name: "Default (Most Fish)", ph: [6.5, 7.5], temp: [24, 26] },
  tropical: { name: "Tropical Community Fish", ph: [6.8, 7.8], temp: [24, 28] },
  goldfish: { name: "Goldfish", ph: [7.0, 8.0], temp: [20, 23] },
  african_cichlids: { name: "African Cichlids", ph: [7.8, 8.6], temp: [24, 28] },
  south_american_cichlids: { name: "South American Cichlids", ph: [6.0, 7.0], temp: [26, 30] },
  betta: { name: "Betta Fish", ph: [6.5, 7.5], temp: [25, 28] },
  flowerhorn: { name: "Flowerhorn", ph: [7.4, 8.0], temp: [28, 30] },
  koi: { name: "Koi (Pond Fish)", ph: [7.0, 8.0], temp: [15, 25] },
  shrimp: { name: "Shrimps & Invertebrates", ph: [6.5, 7.8], temp: [22, 26] },
  marine: { name: "Marine (Saltwater Fish & Corals)", ph: [8.0, 8.4], temp: [24, 27] },
};


  // fetch values from firebase on mount
  useEffect(() => {
    const phRef = ref(database, "parameter_range/ph_range");
    const tempRef = ref(database, "parameter_range/temp_range");

    const unsubscribePh = onValue(phRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setPhMin(data.min?.toString() || "");
        setPhMax(data.max?.toString() || "");
      }
    });

    const unsubscribeTemp = onValue(tempRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setTempMin(data.min?.toString() || "");
        setTempMax(data.max?.toString() || "");
      }
    });

    // cleanup listeners
    return () => {
      unsubscribePh();
      unsubscribeTemp();
    };
  }, []);

  const handleSave = () => {
  const phMinVal = Number(phMin);
  const phMaxVal = Number(phMax);
  const tempMinVal = Number(tempMin);
  const tempMaxVal = Number(tempMax);

  if (!phMin || !phMax || !tempMin || !tempMax) {
    Alert.alert("Missing Values", "Please fill in all fields before saving.");
    return;
  }

  // Validation
  if (phMinVal >= phMaxVal) {
    Alert.alert("Invalid pH Range", "Min value must be less than Max value.");
    return;
  }
  if (tempMinVal >= tempMaxVal) {
    Alert.alert("Invalid Temperature Range", "Min value must be less than Max value.");
    return;
  }

  // Save if valid
  update(ref(database, "parameter_range/ph_range"), {
    min: phMinVal,
    max: phMaxVal,
  });
  update(ref(database, "parameter_range/temp_range"), {
    min: tempMinVal,
    max: tempMaxVal,
  });

  Alert.alert("Success", "Parameter changes saved successfully!");
};

  return (
    <ScrollView style={styles.container} contentContainerStyle={{gap:30, paddingBottom: 60}}>
      <Text style={styles.title}>Adjust Parameter Range</Text>
      <View style={styles.content}>
        <Text>Temperature Range:</Text>
        <View style={styles.valueContainer}>
          <View style={styles.valueRange}>
            <Text>Min.</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              value={tempMin}
              onChangeText={setTempMin}
            />
          </View>
          <View style={styles.valueRange}>
            <Text>Max.</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              value={tempMax}
              onChangeText={setTempMax}
            />
          </View>
        </View>
        <Text>pH Value:</Text>
        <View style={styles.valueContainer}>
          <View style={styles.valueRange}>
            <Text>Min.</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              value={phMin}
              onChangeText={setPhMin}
            />
          </View>
          <View style={styles.valueRange}>
            <Text>Max.</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              value={phMax}
              onChangeText={setPhMax}
            />
          </View>
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, styles.button1]}
          onPress={handleSave}
        >
          <Text style={{ color: "#fff" }}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.button2]}  onPress={() => {
          setPhMin("");
          setPhMax("");
          setTempMin("");
          setTempMax("");
        }}>
          <Text>Clear</Text>
        </TouchableOpacity>
      </View>
      <ImageBackground
      source={require('../../assets/images/logoNobg.png')}
      style={styles.background}
      resizeMode="cover"
      >

         <View style={styles.presetsContainer}>
         {Object.values(presets).map((preset, index) => (
        <TouchableOpacity
          key={index}
          style={styles.preset}
          onPress={() => {
          setPhMin(preset.ph[0].toString());
          setPhMax(preset.ph[1].toString());
          setTempMin(preset.temp[0].toString());
          setTempMax(preset.temp[1].toString());
        }}
        >
        <Text style={styles.presetTitle}>{preset.name}</Text>
        <Text style={styles.presetVal}>
          Temperature: {preset.temp[0]} – {preset.temp[1]} °C
        </Text>
        <Text style={styles.presetVal}>
          pH: {preset.ph[0]} – {preset.ph[1]}
        </Text>
      </TouchableOpacity>
        ))}
      </View>
      </ImageBackground>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 30,
  },
  background: {
    backgroundColor: "transparent",
    width: "100%",
  },
  content: {
    gap: 20
  },
  title: { color: "#848484ff"},
  valueContainer: {
    flexDirection: "row",
    width: "100%"
  },
  valueRange: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  input: {
    borderWidth: 1,
    width: "50%",
    borderColor: "#848484ff",
    borderRadius: 5
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 8
  },
  button1: {
    backgroundColor: "#4293F5",
  },
  button2: {
    backgroundColor: "#fff"
  },
  presetsContainer: {
    rowGap: 15,
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  preset: {
    width: "48%",
    height: 100,
    elevation: 8,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: '#fff',
    opacity: 0.8
  },
  presetTitle: {
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  presetVal: {
    fontSize: 11,
     backgroundColor: 'transparent'
  },
  example: {
    color: "#848484ff",
  }
});
