import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, User, Building, Camera, Users } from "lucide-react-native";

type UserType = "talent" | "industry" | null;

export default function UserTypeScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<UserType>(null);
  const [loading, setLoading] = useState(false);
  const { fullName, phoneNumber, email, password } = useLocalSearchParams();
  console.log("Received params:", { fullName, phoneNumber, email, password });

  const handleContinue = async () => {
    if (!selectedType) return;

    if (selectedType === "talent") {
      router.push({
        pathname: "/(auth)/userInfo",
        params: {
          fullName: fullName,
          phoneNumber: phoneNumber,
          email: email,
          password: password,
          role: selectedType,
        },
      });
    } else {
      router.push({
        pathname: "/(tabs)/applications",
        params: {
          fullName: fullName,
          phoneNumber: phoneNumber,
          email: email,
          password: password,
          role: selectedType,
        },
      });
    }
  };

  const userTypes = [
    {
      id: "talent" as UserType,
      title: "Talent & Actors",
      subtitle: "Find auditions and showcase your skills",
      icon: User,
      features: [
        "Create professional portfolio",
        "Apply to casting calls",
        "Network with industry professionals",
        "Track your applications",
      ],
    },
    {
      id: "industry" as UserType,
      title: "Industry Professional",
      subtitle: "Post jobs and discover talent",
      icon: Building,
      features: [
        "Post casting calls",
        "Search and filter talent",
        "Manage applications",
        "Connect with performers",
      ],
    },
  ];

  return (
    <LinearGradient colors={["#000000", "#1a1a1a"]} style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft color="#FFFFFF" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Choose Your Role</Text>
          <Text style={styles.headerSubtitle}>
            How will you be using 24Craftz?
          </Text>
        </View>

        {/* User Type Options */}
        <View style={styles.optionsContainer}>
          {userTypes.map((type) => {
            const IconComponent = type.icon;
            const isSelected = selectedType === type.id;

            return (
              <TouchableOpacity
                key={type.id}
                style={[styles.optionCard, isSelected && styles.selectedCard]}
                onPress={() => setSelectedType(type.id)}
              >
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.iconContainer,
                      isSelected && styles.selectedIconContainer,
                    ]}
                  >
                    <IconComponent
                      color={isSelected ? "#000000" : "#FFD700"}
                      size={32}
                    />
                  </View>
                  <View style={styles.cardTitleContainer}>
                    <Text
                      style={[
                        styles.cardTitle,
                        isSelected && styles.selectedCardTitle,
                      ]}
                    >
                      {type.title}
                    </Text>
                    <Text
                      style={[
                        styles.cardSubtitle,
                        isSelected && styles.selectedCardSubtitle,
                      ]}
                    >
                      {type.subtitle}
                    </Text>
                  </View>
                </View>

                <View style={styles.featuresContainer}>
                  {type.features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <View
                        style={[
                          styles.featureDot,
                          isSelected && styles.selectedFeatureDot,
                        ]}
                      />
                      <Text
                        style={[
                          styles.featureText,
                          isSelected && styles.selectedFeatureText,
                        ]}
                      >
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>

                {isSelected && (
                  <View style={styles.selectedIndicator}>
                    <Camera color="#FFD700" size={16} />
                    <Text style={styles.selectedText}>Selected</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !selectedType && styles.disabledButton,
            ]}
            onPress={handleContinue}
            disabled={!selectedType}
          >
            <LinearGradient
              colors={
                selectedType ? ["#FFD700", "#FFA500"] : ["#333333", "#333333"]
              }
              style={styles.gradientButton}
            >
              <Text
                style={[
                  styles.continueButtonText,
                  !selectedType && styles.disabledButtonText,
                ]}
              >
                Continue to 24Craftz
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 60,
    marginBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: "Playfair-Bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#C0C0C0",
  },
  optionsContainer: {
    marginBottom: 40,
  },
  optionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  selectedCard: {
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    borderColor: "#FFD700",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.3)",
  },
  selectedIconContainer: {
    backgroundColor: "#FFD700",
    borderColor: "#FFD700",
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  selectedCardTitle: {
    color: "#FFFFFF",
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#C0C0C0",
  },
  selectedCardSubtitle: {
    color: "#E0E0E0",
  },
  featuresContainer: {
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FFD700",
    marginRight: 12,
  },
  selectedFeatureDot: {
    backgroundColor: "#FFD700",
  },
  featureText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#C0C0C0",
    flex: 1,
  },
  selectedFeatureText: {
    color: "#E0E0E0",
  },
  selectedIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 215, 0, 0.3)",
  },
  selectedText: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    color: "#FFD700",
    marginLeft: 8,
  },
  buttonContainer: {
    paddingBottom: 40,
  },
  continueButton: {
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
  },
  disabledButton: {
    opacity: 0.5,
  },
  gradientButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#000000",
  },
  disabledButtonText: {
    color: "#666666",
  },
});
