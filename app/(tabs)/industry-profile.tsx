import React, { useState } from 'react';
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
import { Settings, CreditCard as Edit, Camera, Star, MapPin, Phone, Mail, Calendar, Award, Users, Briefcase, Building, Share, Bell, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight, Film, TrendingUp, Eye } from 'lucide-react-native';
import { router } from 'expo-router';

interface CompanyStat {
  label: string;
  value: string;
  icon: React.ComponentType<any>;
}

interface Project {
  id: string;
  title: string;
  type: string;
  year: string;
  poster: string;
  status: 'Completed' | 'In Production' | 'Pre-Production';
}

const companyStats: CompanyStat[] = [
  { label: 'Active Castings', value: '8', icon: Briefcase },
  { label: 'Total Applications', value: '342', icon: Users },
  { label: 'Successful Hires', value: '67', icon: Award },
  { label: 'Company Rating', value: '4.7', icon: Star },
];

const recentProjects: Project[] = [
  {
    id: '1',
    title: 'Echoes of Tomorrow',
    type: 'Feature Film',
    year: '2024',
    poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=200',
    status: 'In Production',
  },
  {
    id: '2',
    title: 'City Lights',
    type: 'Web Series',
    year: '2023',
    poster: 'https://images.pexels.com/photos/7991678/pexels-photo-7991678.jpeg?auto=compress&cs=tinysrgb&w=200',
    status: 'Completed',
  },
  {
    id: '3',
    title: 'The Last Letter',
    type: 'Short Film',
    year: '2024',
    poster: 'https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=200',
    status: 'Pre-Production',
  },
];

export default function IndustryProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [profilePrivate, setProfilePrivate] = useState(false);

  const renderStatCard = (stat: CompanyStat, index: number) => {
    const IconComponent = stat.icon;
    return (
      <View key={index} style={styles.statCard}>
        <IconComponent color="#FFD700" size={20} />
        <Text style={styles.statValue}>{stat.value}</Text>
        <Text style={styles.statLabel}>{stat.label}</Text>
      </View>
    );
  };

  const renderProjectCard = (project: Project) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'Completed':
          return '#4CAF50';
        case 'In Production':
          return '#FFD700';
        case 'Pre-Production':
          return '#FF9800';
        default:
          return '#C0C0C0';
      }
    };

    return (
      <TouchableOpacity key={project.id} style={styles.projectCard}>
        <Image source={{ uri: project.poster }} style={styles.projectPoster} />
        <View style={styles.projectInfo}>
          <Text style={styles.projectTitle}>{project.title}</Text>
          <Text style={styles.projectType}>{project.type} • {project.year}</Text>
          <View style={[
            styles.projectStatus,
            { backgroundColor: `${getStatusColor(project.status)}20` }
          ]}>
            <Text style={[
              styles.projectStatusText,
              { color: getStatusColor(project.status) }
            ]}>
              {project.status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const settingsOptions = [
    { icon: Bell, label: 'Notifications', hasSwitch: true, value: notificationsEnabled, onToggle: setNotificationsEnabled },
    { icon: Shield, label: 'Privacy', hasSwitch: true, value: profilePrivate, onToggle: setProfilePrivate },
    { icon: HelpCircle, label: 'Help & Support', hasArrow: true },
    { icon: Share, label: 'Share Company Profile', hasArrow: true },
    { icon: LogOut, label: 'Sign Out', hasArrow: true, isDestructive: true, onPress: () => {
      // AsyncStorage.removeItem('token');
      router.replace('/(auth)/login')
    } },
  ];

  return (
    <LinearGradient colors={['#000000', '#1a1a1a']} style={styles.container}>
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

          {/* Company Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.companyImageContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=300' }}
                style={styles.companyImage}
              />
              <TouchableOpacity style={styles.cameraButton}>
                <Camera color="#000000" size={16} />
              </TouchableOpacity>
            </View>

            <Text style={styles.companyName}>Stellar Productions</Text>
            <Text style={styles.companyType}>Film Production House</Text>

            <View style={styles.companyInfo}>
              <View style={styles.infoItem}>
                <MapPin color="#C0C0C0" size={16} />
                <Text style={styles.infoText}>Mumbai, India</Text>
              </View>
              <View style={styles.infoItem}>
                <Calendar color="#C0C0C0" size={16} />
                <Text style={styles.infoText}>Established 2018</Text>
              </View>
              <View style={styles.infoItem}>
                <Award color="#FFD700" size={16} />
                <Text style={styles.infoText}>Verified Production House</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.editButton}>
              <Edit color="#000000" size={16} />
              <Text style={styles.editButtonText}>Edit Company Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Company Performance</Text>
            <View style={styles.statsGrid}>
              {companyStats.map(renderStatCard)}
            </View>
          </View>

          {/* Recent Projects */}
          <View style={styles.projectsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Projects</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.projectsGrid}
            >
              {recentProjects.map(renderProjectCard)}
            </ScrollView>
          </View>

          {/* Company Details */}
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Company Details</Text>
            <View style={styles.detailsCard}>
              <View style={styles.detailItem}>
                <Building color="#FFD700" size={20} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Industry Focus</Text>
                  <Text style={styles.detailValue}>Feature Films, Web Series, Commercials</Text>
                </View>
              </View>
              
              <View style={styles.detailItem}>
                <Users color="#FFD700" size={20} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Team Size</Text>
                  <Text style={styles.detailValue}>25-50 employees</Text>
                </View>
              </View>
              
              <View style={styles.detailItem}>
                <TrendingUp color="#FFD700" size={20} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Projects Completed</Text>
                  <Text style={styles.detailValue}>15+ successful productions</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsSection}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity style={styles.quickActionCard}>
                <Briefcase color="#FFD700" size={24} />
                <Text style={styles.quickActionText}>Post New Casting</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickActionCard}>
                <Eye color="#FFD700" size={24} />
                <Text style={styles.quickActionText}>View Applications</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickActionCard}>
                <Users color="#FFD700" size={24} />
                <Text style={styles.quickActionText}>Search Talent</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickActionCard}>
                <Film color="#FFD700" size={24} />
                <Text style={styles.quickActionText}>Manage Projects</Text>
              </TouchableOpacity>
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
                    option.isDestructive && styles.destructiveItem
                  ]}
                  onPress={option.onPress}
                >
                  <View style={styles.settingItemLeft}>
                    <IconComponent
                      color={option.isDestructive ? '#FF4458' : '#C0C0C0'}
                      size={20}
                    />
                    <Text style={[
                      styles.settingLabel,
                      option.isDestructive && styles.destructiveLabel
                    ]}>
                      {option.label}
                    </Text>
                  </View>
                  <View style={styles.settingItemRight}>
                    {option.hasSwitch && (
                      <Switch
                        value={option.value}
                        onValueChange={option.onToggle}
                        trackColor={{ false: '#333333', true: '#FFD700' }}
                        thumbColor={option.value ? '#000000' : '#FFFFFF'}
                      />
                    )}
                    {option.hasArrow && (
                      <ChevronRight
                        color={option.isDestructive ? '#FF4458' : '#C0C0C0'}
                        size={20}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
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
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  companyImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  companyImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
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
  companyName: {
    fontSize: 24,
    fontFamily: 'Playfair-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  companyType: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#C0C0C0',
    marginBottom: 16,
  },
  companyInfo: {
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
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statValue: {
    fontSize: 20,
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
  projectsSection: {
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
  projectsGrid: {
    paddingLeft: 20,
  },
  projectCard: {
    marginRight: 12,
    alignItems: 'center',
    width: 120,
  },
  projectPoster: {
    width: 100,
    height: 140,
    borderRadius: 8,
    marginBottom: 8,
  },
  projectInfo: {
    alignItems: 'center',
    width: '100%',
  },
  projectTitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  projectType: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#C0C0C0',
    marginBottom: 6,
  },
  projectStatus: {
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  projectStatusText: {
    fontSize: 9,
    fontFamily: 'Inter-SemiBold',
  },
  detailsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  detailsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailContent: {
    marginLeft: 16,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#C0C0C0',
    lineHeight: 18,
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  quickActionText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginTop: 8,
    textAlign: 'center',
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