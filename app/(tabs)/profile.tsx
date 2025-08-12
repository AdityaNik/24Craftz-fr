import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, CreditCard as Edit, Camera, Star, MapPin, Phone, Mail, Calendar, Award, Users, Briefcase, Heart, Share, Bell, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight, CirclePlay as PlayCircle, Image as ImageIcon, Video, Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheetExperience from '../components/BottomSheetExperience';

export const BACKEND_URL = 'http://192.168.1.51:3000';

interface ProfileData {
  fullName: string;
  phoneNumber: string;
  email: string;
  role: string;
  age: number;
  preferences?: string[];
  state?: string;
  city?: string;
  gender?: string;
}

interface ProfileStat {
  label: string;
  value: string;
  icon: React.ComponentType<any>;
}

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
}

const profileStats: ProfileStat[] = [
  { label: 'Applications', value: '24', icon: Briefcase },
  { label: 'Profile Views', value: '156', icon: Users },
  { label: 'Likes', value: '89', icon: Heart },
  { label: 'Reviews', value: '12', icon: Star },
];

const mediaPortfolio: MediaItem[] = [
  {
    id: '1',
    type: 'image',
    url: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=300',
    title: 'Headshot 1'
  },
  {
    id: '2',
    type: 'video',
    url: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300',
    title: 'Acting Demo Reel'
  },
  {
    id: '3',
    type: 'image',
    url: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300',
    title: 'Headshot 2'
  },
  {
    id: '4',
    type: 'image',
    url: 'https://images.pexels.com/photos/7991678/pexels-photo-7991678.jpeg?auto=compress&cs=tinysrgb&w=300',
    title: 'Portfolio Shot'
  },
];

export default function ProfileScreen() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [profilePrivate, setProfilePrivate] = useState(false);
  const router = useRouter();
  
  const bottomSheetRef = useRef<any>(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios(`${BACKEND_URL}/auth/me`, {
        headers: {
          Authorization: `${await AsyncStorage.getItem('token')}`
        }
      }); 
      if(response.data.user) {
        console.log("User data:", response.data.user);
        setProfileData({
          fullName: response.data.user.fullName,
          phoneNumber: response.data.user.phoneNumber,
          email: response.data.user.email,
          role: response.data.user.role,
          age: response.data.user.age,
          preferences: response.data.user.preferences,
          state: response.data.user.state,
          city: response.data.user.city,
        });
      } else {
        console.log("No user data");
      }  
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
    getUserInfo()
  }, [])

  const handleOpenExperienceSheet = () => {
    bottomSheetRef.current?.open();
  };

  const handleCloseExperienceSheet = () => {
    console.log("Experience sheet closed");
  };

  const renderStatCard = (stat: ProfileStat, index: number) => {
    const IconComponent = stat.icon;
    return (
      <View key={index} style={styles.statCard}>
        <IconComponent color="#FFD700" size={18} />
        <Text style={styles.statValue}>{stat.value}</Text>
        <Text style={styles.statLabel}>{stat.label}</Text>
      </View>
    );
  };

  const renderMediaItem = (item: MediaItem) => (
    <TouchableOpacity key={item.id} style={styles.mediaItem}>
      <Image source={{ uri: item.url }} style={styles.mediaImage} />
      <View style={styles.mediaOverlay}>
        {item.type === 'video' ? (
          <PlayCircle color="#FFFFFF" size={24} />
        ) : (
          <ImageIcon color="#FFFFFF" size={24} />
        )}
      </View>
      <Text style={styles.mediaTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const settingsOptions = [
    // { icon: Bell, label: 'Notifications', hasSwitch: true, value: notificationsEnabled, onToggle: setNotificationsEnabled },
    // { icon: Shield, label: 'Privacy', hasSwitch: true, value: profilePrivate, onToggle: setProfilePrivate },
    { icon: HelpCircle, label: 'Help & Support', hasArrow: true },
    { icon: Share, label: 'Share Profile', hasArrow: true },
    { icon: LogOut, label: 'Sign Out', hasArrow: true, isDestructive: true, onPress: () => {
      AsyncStorage.removeItem('token');
      router.replace('/(auth)/login')
    } },
  ];

  return (
    <LinearGradient colors={["#000000", "#1a1a1a"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.settingsButton}>
              <Settings color="#FFFFFF" size={20} />
            </TouchableOpacity>
          </View>

          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
                }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.cameraButton}>
                <Camera color="#000000" size={16} />
              </TouchableOpacity>
            </View>

            <Text style={styles.profileName}>{profileData?.fullName}</Text>
            <Text style={styles.profileTitle}>Aspiring Actor & Performer</Text>

            <View style={styles.profileInfo}>
              <View style={styles.infoItem}>
                <MapPin color="#C0C0C0" size={16} />
                <Text
                  style={styles.infoText}
                >{`${profileData?.city}, ${profileData?.state}`}</Text>
              </View>
              <View style={styles.infoItem}>
                <Calendar color="#C0C0C0" size={16} />
                <Text
                  style={styles.infoText}
                >{`${profileData?.age} years old`}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.editButton}>
              <Edit color="#000000" size={16} />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Stats Section */}
          {/* <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Profile Stats</Text>
            <View style={styles.statsGrid}>
              {profileStats.map(renderStatCard)}
            </View>
          </View> */}

          {/* Portfolio Section */}
          {/* <View style={styles.portfolioSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Media Portfolio</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.mediaGrid}
            >
              {mediaPortfolio.map(renderMediaItem)}
            </ScrollView>
          </View> */}

          {/* Experience Section */}
          <View style={styles.experienceSection}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.sectionTitle}>Experience & Skills</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#FFD700",
                  padding: 4,
                  borderRadius: 20,
                  marginLeft: 8,
                }}
                onPress={handleOpenExperienceSheet}
              >
                <Plus color="#000000" size={20} />
              </TouchableOpacity>
            </View>
            <View style={styles.experienceCard}>
              <View style={styles.experienceHeader}>
                <Text style={styles.experienceTitle}>Theatre Actor</Text>
                <Text style={styles.experienceCompany}>
                  Mumbai Theatre Group
                </Text>
              </View>
              <Text style={styles.experienceDescription}>
                Performed in multiple stage productions including classical and
                contemporary plays.
              </Text>
              <View style={styles.skillsContainer}>
                {["Hindi", "English", "Marathi", "Drama", "Comedy"].map(
                  (skill, index) => (
                    <View key={index} style={styles.skillChip}>
                      <Text style={styles.skillText}>{skill}</Text>
                    </View>
                  )
                )}
              </View>
            </View>
          </View>

          {/* Preferences Section */}
          <View style={styles.preferencesSection}>
            <Text style={styles.sectionTitle}>Work Preferences</Text>
            <View style={styles.preferencesGrid}>
              {(profileData?.preferences ?? []).map((pref, index) => (
                <View key={index} style={styles.preferenceItem}>
                  <Text style={styles.preferenceLabel}>{pref}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Settings Section */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Settings & Privacy</Text>
            {settingsOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.settingItem,
                    option.isDestructive && styles.destructiveItem,
                  ]}
                  onPress={option.onPress}
                >
                  <View style={styles.settingItemLeft}>
                    <IconComponent
                      color={option.isDestructive ? "#FF4458" : "#C0C0C0"}
                      size={20}
                    />
                    <Text
                      style={[
                        styles.settingLabel,
                        option.isDestructive && styles.destructiveLabel,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </View>
                  <View style={styles.settingItemRight}>
                    {/* {option.hasSwitch && (
                      <Switch
                        value={option.value}
                        onValueChange={option.onToggle}
                        trackColor={{ false: "#333333", true: "#FFD700" }}
                        thumbColor={option.value ? "#000000" : "#FFFFFF"}
                      />
                    )} */}
                    {option.hasArrow && (
                      <ChevronRight
                        color={option.isDestructive ? "#FF4458" : "#C0C0C0"}
                        size={20}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        
        <BottomSheetExperience 
          ref={bottomSheetRef}
          onClose={handleCloseExperienceSheet}
        />
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    alignItems: 'flex-end',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    alignItems:  'center',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FFD700',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Playfair-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#C0C0C0',
    marginBottom: 16,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#E0E0E0',
    marginLeft: 8,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  editButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
    marginLeft: 8,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 10 ,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statValue: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#C0C0C0',
    textAlign: 'center',
  },
  portfolioSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFD700',
  },
  mediaGrid: {
    paddingLeft: 20,
  },
  mediaItem: {
    marginRight: 12,
    alignItems: 'center',
  },
  mediaImage: {
    width: 100,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  mediaOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaTitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#C0C0C0',
    textAlign: 'center',
    maxWidth: 100,
  },
  experienceSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  experienceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  experienceHeader: {
    marginBottom: 8,
  },
  experienceTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  experienceCompany: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFD700',
  },
  experienceDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#C0C0C0',
    lineHeight: 20,
    marginBottom: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillChip: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFD700',
  },
  preferencesSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  preferencesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  preferenceItem: {
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  preferenceLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  preferenceIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  preferenceActive: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
  },
  preferenceStatus: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#C0C0C0',
  },
  preferenceStatusActive: {
    color: '#FFD700',
  },
  settingsSection: {
    paddingHorizontal: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  destructiveItem: {
    borderBottomColor: 'rgba(255, 68, 88, 0.2)',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  destructiveLabel: {
    color: '#FF4458',
  },
  settingItemRight: {
    alignItems: 'center',
  },
});