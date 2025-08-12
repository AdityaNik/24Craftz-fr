import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Film, Star, Users } from "lucide-react-native";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#000000", "#1a1a1a", "#000000"]}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Film color="#FFD700" size={48} strokeWidth={1.5} />
          </View>
          <Text style={styles.appName}>24Craftz</Text>
          <Text style={styles.tagline}>Redefine Cinema</Text>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <View style={styles.featureItem}>
            <Star color="#FFD700" size={24} />
            <Text style={styles.featureText}>Discover Talent</Text>
          </View>
          <View style={styles.featureItem}>
            <Users color="#FFD700" size={24} />
            <Text style={styles.featureText}>Connect Professionals</Text>
          </View>
          <View style={styles.featureItem}>
            <Film color="#FFD700" size={24} />
            <Text style={styles.featureText}>Create Opportunities</Text>
          </View>
        </View>

        {/* CTA Buttons */}
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => {
              console.log("Navigate to register");
              router.push("/(auth)/register");
            }}
          >
            <LinearGradient
              colors={["#FFD700", "#FFA500"]}
              style={styles.gradientButton}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/(auth)/login")}
          >
            <Text style={styles.secondaryButtonText}>
              Already have an account?
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Background Elements */}
      <View style={styles.backgroundDecoration}>
        <View style={[styles.decorationCircle, styles.circle1]} />
        <View style={[styles.decorationCircle, styles.circle2]} />
        <View style={[styles.decorationCircle, styles.circle3]} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 60,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.3)",
  },
  appName: {
    fontSize: 36,
    fontFamily: "Playfair-Bold",
    color: "#FFFFFF",
    marginBottom: 8,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#C0C0C0",
    letterSpacing: 0.5,
  },
  featuresSection: {
    marginBottom: 60,
    alignItems: "center",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.2)",
    minWidth: 200,
  },
  featureText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#FFFFFF",
    marginLeft: 12,
  },
  buttonSection: {
    width: "100%",
    alignItems: "center",
  },
  primaryButton: {
    width: "100%",
    height: 56,
    borderRadius: 28,
    marginBottom: 16,
    overflow: "hidden",
  },
  gradientButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#000000",
    letterSpacing: 0.5,
  },
  secondaryButton: {
    paddingVertical: 16,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#C0C0C0",
    textDecorationLine: "underline",
  },
  backgroundDecoration: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  decorationCircle: {
    position: "absolute",
    borderRadius: 100,
    backgroundColor: "rgba(255, 215, 0, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.1)",
  },
  circle1: {
    width: 200,
    height: 200,
    top: height * 0.1,
    right: -100,
  },
  circle2: {
    width: 150,
    height: 150,
    top: height * 0.7,
    left: -75,
  },
  circle3: {
    width: 100,
    height: 100,
    top: height * 0.3,
    left: width * 0.1,
  },
});
