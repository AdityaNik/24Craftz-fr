import { Tabs } from 'expo-router';
import { Briefcase, MessageSquare, Bell, User, Plus, Search, FileText } from 'lucide-react-native';
import { useEffect, useState } from 'react';

export default function TabLayout() {
  const [userType, setUserType] = useState<'talent' | 'industry'>('talent');

  useEffect(() => {
    setUserType('talent');
  }, []);

  if (userType === 'industry') {
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#000000',
            borderTopWidth: 1,
            borderTopColor: 'rgba(255, 255, 255, 0.1)',
            paddingTop: 8,
            paddingBottom: 24,
            height: 84,
          },
          tabBarActiveTintColor: '#FFD700',
          tabBarInactiveTintColor: '#666666',
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Inter-Medium',
            marginTop: 4,
          },
        }}>
        <Tabs.Screen
          name="post-job"
          options={{
            title: 'Post Job',
            tabBarIcon: ({ size, color }) => (
              <Plus size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="applications"
          options={{
            title: 'Applications',
            tabBarIcon: ({ size, color }) => (
              <FileText size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="talent-search"
          options={{
            title: 'Search Talent',
            tabBarIcon: ({ size, color }) => (
              <Search size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: 'Notifications',
            tabBarIcon: ({ size, color }) => (
              <Bell size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="industry-profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ size, color }) => (
              <User size={size} color={color} />
            ),
          }}
        />
        {/* Hide talent-specific screens */}
        <Tabs.Screen
          name="index"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="reviews"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            href: null,
          }}
        />
      </Tabs>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopWidth: 1,
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
          paddingTop: 8,
          paddingBottom: 24,
          height: 84,
        },
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: '#666666',
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Inter-Medium',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Jobs',
          tabBarIcon: ({ size, color }) => (
            <Briefcase size={size} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="reviews"
        options={{
          title: 'Reviews',
          tabBarIcon: ({ size, color }) => (
            <MessageSquare size={size} color={color} />
          ),
        }}
      /> */}
      {/* <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ size, color }) => (
            <Bell size={size} color={color} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
      {/* Hide industry-specific screens for talent users */}
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
    </Tabs>
  );
}