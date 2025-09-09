import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, Filter, Calendar } from "lucide-react-native";

export default function ApplicationsScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <LinearGradient colors={["#000000", "#1a1a1a"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Casting Management</Text>
              <Text style={styles.headerTitle}>Applications</Text>
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Filter color="#FFFFFF" size={20} />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Search color="#C0C0C0" size={20} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search applications..."
                placeholderTextColor="#666666"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>
        </View>

        {/* Applications List */}
        <ScrollView
          style={styles.applicationsList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.applicationsContent}
        >
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsCount}>Job Posted</Text>
            <TouchableOpacity style={styles.sortButton}>
              <Calendar color="#C0C0C0" size={16} />
              <Text style={styles.sortText}>Latest First</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#C0C0C0",
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Playfair-Bold",
    color: "#FFFFFF",
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    marginBottom: 8,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
  },
  applicationsList: {
    flex: 1,
  },
  applicationsContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  resultsCount: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: "#FFFFFF",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  sortText: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
    color: "#C0C0C0",
    marginLeft: 6,
  },
});

