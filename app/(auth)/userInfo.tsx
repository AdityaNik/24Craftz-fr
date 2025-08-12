import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BACKEND_URL } from "../(tabs)/profile";

const statesWithCities = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Karnataka: ["Bengaluru", "Mysore"],
  Delhi: ["New Delhi", "Dwarka"],
  TamilNadu: ["Chennai", "Coimbatore"],
};

const Gender = {
  Male: "Male",
  Female: "Female",
  Other: "Other",
};

const preferencesList = [
  "Movies",
  "Web Series",
  "Short Films",
  "Theatre",
  "Commercials",
  "Bold Content",
];

export default function UserInfo() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [showStateModal, setShowStateModal] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const { fullName, phoneNumber, email, password, role } = useLocalSearchParams();

  const togglePreference = (pref: string) => {
    setPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const handleNext = async () => {
    console.log({ selectedState, selectedCity, age, preferences });

    try {
      const res = await axios.post(`${BACKEND_URL}/auth/signup`, {
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
        role: role,
        state: selectedState,
        city: selectedCity,
        gender: gender,
        age: age,
        preferences: preferences,
      });

      const { token } = res.data;
      if (!token) {
        Alert.alert(
          "Error",
          "Failed to create account. Please try again later."
        );
        return;
      }
      AsyncStorage.setItem("token", "Bearer " + token);
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert(
        "Error",
        "An error occurred while creating your account. Please try again later"
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#000000", "#1a1a1a"]} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ArrowLeft color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>More About You</Text>
        </View>
        {/* Location */}
        <TouchableOpacity
          onPress={() => setShowStateModal(true)}
          style={styles.inputBox}
        >
          <Text style={styles.inputText}>
            {selectedState || "Select State"}
          </Text>
        </TouchableOpacity>
        {selectedState ? (
          <TouchableOpacity
            onPress={() => setShowCityModal(true)}
            style={styles.inputBox}
          >
            <Text style={styles.inputText}>
              {selectedCity || "Select City"}
            </Text>
          </TouchableOpacity>
        ) : null}

        {/* Gender */}
        <TouchableOpacity
          onPress={() => setShowGenderModal(true)}
          style={styles.inputBox}
        >
          <Text style={gender ? styles.inputText : styles.placeholderText}>
            {gender || "Select Gender"}
          </Text>
        </TouchableOpacity>

        {/* Age */}
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Age"
          placeholderTextColor="#888"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        {/* Preferences */}
        <Text style={styles.sectionTitle}>Work Preferences</Text>
        <View style={styles.checkboxGroup}>
          {preferencesList.map((pref) => (
            <TouchableOpacity
              key={pref}
              style={[
                styles.checkboxItem,
                preferences.includes(pref) && styles.checkboxItemSelected,
              ]}
              onPress={() => togglePreference(pref)}
            >
              <Text
                style={[
                  styles.checkboxText,
                  preferences.includes(pref) && styles.checkboxTextSelected,
                ]}
              >
                {pref}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
          <LinearGradient
            colors={["#FFD700", "#FFA500"]}
            style={styles.submitGradient}
          >
            <Text style={styles.submitText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      {/* State Modal */}
      <Modal visible={showStateModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={Object.keys(statesWithCities)}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedState(item);
                    setSelectedCity("");
                    setShowStateModal(false);
                  }}
                >
                  <Text style={styles.modalText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* City Modal */}
      <Modal visible={showCityModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={
                statesWithCities[
                  selectedState as keyof typeof statesWithCities
                ] || []
              }
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedCity(item);
                    setShowCityModal(false);
                  }}
                >
                  <Text style={styles.modalText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Gender Modal */}
      <Modal visible={showGenderModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={Object.keys(Gender)}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setGender(item);
                    setShowGenderModal(false);
                  }}
                >
                  <Text style={styles.modalText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 24,
  },
  backButton: {
    marginBottom: 16,
    width: 40,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "Playfair-Bold",
    color: "#FFF",
  },
  inputBox: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  inputText: {
    fontSize: 16,
    color: "#FFF",
  },
  sectionTitle: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 12,
    fontFamily: "Inter-SemiBold",
  },
  checkboxGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  checkboxItem: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  checkboxItemSelected: {
    backgroundColor: "#FFD700",
    borderColor: "#FFD700",
  },
  checkboxText: {
    color: "#C0C0C0",
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  checkboxTextSelected: {
    color: "#000",
    fontFamily: "Inter-SemiBold",
  },
  submitButton: {
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
  },
  submitGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#000",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  modalContent: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    width: "100%",
    maxHeight: "60%",
    padding: 16,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  modalText: {
    fontSize: 16,
    color: "#FFF",
  },
  placeholderText: {
    fontSize: 16,
    color: "#888",
  },
});
