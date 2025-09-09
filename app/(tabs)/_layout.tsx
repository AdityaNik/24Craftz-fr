import { Tabs } from "expo-router";
import { User, FileText, PowerCircle, Workflow } from "lucide-react-native";

type LoginUser = "client" | "talent";

export default function TabLayout() {
  const loginUser = "client" as LoginUser; // Change to "client" or "talent" to test

  return (
    <>
      {loginUser === "client" ? (
        <>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: "#000000",
                borderTopWidth: 1,
                borderTopColor: "rgba(255, 255, 255, 0.1)",
                paddingTop: 8,
                paddingBottom: 24,
                height: 84,
              },
              tabBarActiveTintColor: "#FFD700",
              tabBarInactiveTintColor: "#666666",
              tabBarLabelStyle: {
                fontSize: 12,
                fontFamily: "Inter-Medium",
                marginTop: 4,
              },
            }}
          >
            {" "}
            <Tabs.Screen
              name="applications"
              options={{
                title: "Applications",
                tabBarIcon: ({ size, color }) => (
                  <FileText size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="post-job"
              options={{
                title: "Post Job",
                tabBarIcon: ({ size, color }) => (
                  <PowerCircle size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="industry-profile"
              options={{
                title: "Profile",
                tabBarIcon: ({ size, color }) => (
                  <User size={size} color={color} />
                ),
              }}
            />
            {/* Hide talent screens */}
            <Tabs.Screen name="index" options={{ href: null }} />
            <Tabs.Screen name="reviews" options={{ href: null }} />
            <Tabs.Screen name="profile" options={{ href: null }} />
            <Tabs.Screen
              name="talent-search"
              options={{
                href: null,
              }}
            />
          </Tabs>
        </>
      ) : (
        <>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: "#000000",
                borderTopWidth: 1,
                borderTopColor: "rgba(255, 255, 255, 0.1)",
                paddingTop: 8,
                paddingBottom: 24,
                height: 84,
              },
              tabBarActiveTintColor: "#FFD700",
              tabBarInactiveTintColor: "#666666",
              tabBarLabelStyle: {
                fontSize: 12,
                fontFamily: "Inter-Medium",
                marginTop: 4,
              },
            }}
          >
            <Tabs.Screen
              name="post-job"
              options={{
                href: null,
              }}
            />
            <Tabs.Screen
              name="applications"
              options={{
                href: null,
              }}
            />
            <Tabs.Screen
              name="talent-search"
              options={{
                href: null,
              }}
            />
            <Tabs.Screen
              name="industry-profile"
              options={{
                href: null,
              }}
            />
            {/* Hide talent screens */}
            <Tabs.Screen
              name="index"
              options={{
                title: "Jobs",
                tabBarIcon: ({ size, color }) => (
                  <Workflow size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="reviews"
              options={{
                title: "reviews",
                tabBarIcon: ({ size, color }) => (
                  <Workflow size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: "Profile",
                tabBarIcon: ({ size, color }) => (
                  <User size={size} color={color} />
                ),
              }}
            />
          </Tabs>
        </>
      )}
    </>
  );
}
