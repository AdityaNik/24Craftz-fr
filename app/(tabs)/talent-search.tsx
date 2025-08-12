import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, MapPin, Calendar, Star, Eye, MessageCircle, Bookmark, Users, Award, CirclePlay as PlayCircle } from 'lucide-react-native';

interface Talent {
  id: string;
  name: string;
  profileImage: string;
  age: number;
  location: string;
  experience: string;
  rating: number;
  profileViews: number;
  specializations: string[];
  languages: string[];
  recentWork: string[];
  availability: 'Available' | 'Busy' | 'Selective';
  verified: boolean;
  portfolioCount: number;
  videoReelUrl?: string;
}

const mockTalents: Talent[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
    age: 26,
    location: 'Mumbai, India',
    experience: '3-5 years',
    rating: 4.8,
    profileViews: 234,
    specializations: ['Drama', 'Romance', 'Thriller'],
    languages: ['Hindi', 'English', 'Marathi'],
    recentWork: ['City Lights Web Series', 'Midnight Express'],
    availability: 'Available',
    verified: true,
    portfolioCount: 12,
    videoReelUrl: 'demo-reel.mp4',
  },
  {
    id: '2',
    name: 'Arjun Patel',
    profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
    age: 29,
    location: 'Delhi, India',
    experience: '5+ years',
    rating: 4.6,
    profileViews: 189,
    specializations: ['Action', 'Drama', 'Comedy'],
    languages: ['Hindi', 'English', 'Punjabi'],
    recentWork: ['Urban Tales', 'The Last Stand'],
    availability: 'Selective',
    verified: true,
    portfolioCount: 18,
  },
  {
    id: '3',
    name: 'Meera Nair',
    profileImage: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300',
    age: 24,
    location: 'Bangalore, India',
    experience: '1-3 years',
    rating: 4.4,
    profileViews: 156,
    specializations: ['Drama', 'Independent Films'],
    languages: ['Hindi', 'English', 'Tamil', 'Malayalam'],
    recentWork: ['Silent Echoes', 'Morning Coffee'],
    availability: 'Available',
    verified: false,
    portfolioCount: 8,
    videoReelUrl: 'acting-samples.mp4',
  },
];

const filters = {
  experience: ['Any', 'Fresher', '1-3 years', '3-5 years', '5+ years'],
  gender: ['Any', 'Male', 'Female', 'Non-Binary'],
  location: ['Any', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'],
  availability: ['Any', 'Available', 'Selective', 'Busy'],
};

export default function TalentSearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [talents] = useState<Talent[]>(mockTalents);
  const [selectedFilters, setSelectedFilters] = useState({
    experience: 'Any',
    gender: 'Any',
    location: 'Any',
    availability: 'Any',
  });
  const [bookmarkedTalents, setBookmarkedTalents] = useState<Set<string>>(new Set());

  const toggleBookmark = (talentId: string) => {
    setBookmarkedTalents(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(talentId)) {
        newBookmarks.delete(talentId);
      } else {
        newBookmarks.add(talentId);
      }
      return newBookmarks;
    });
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available':
        return '#4CAF50';
      case 'Selective':
        return '#FFD700';
      case 'Busy':
        return '#FF4458';
      default:
        return '#C0C0C0';
    }
  };

  const renderTalentCard = (talent: Talent) => (
    <View key={talent.id} style={styles.talentCard}>
      <View style={styles.talentHeader}>
        <View style={styles.talentImageContainer}>
          <Image source={{ uri: talent.profileImage }} style={styles.talentImage} />
          {talent.verified && (
            <View style={styles.verifiedBadge}>
              <Award color="#FFD700" size={12} />
            </View>
          )}
          <View style={[
            styles.availabilityIndicator,
            { backgroundColor: getAvailabilityColor(talent.availability) }
          ]} />
        </View>

        <View style={styles.talentInfo}>
          <Text style={styles.talentName}>{talent.name}</Text>
          <View style={styles.talentMeta}>
            <Text style={styles.talentAge}>{talent.age} years</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.talentExperience}>{talent.experience}</Text>
          </View>
          <View style={styles.locationContainer}>
            <MapPin color="#C0C0C0" size={14} />
            <Text style={styles.locationText}>{talent.location}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Star color="#FFD700" size={14} fill="#FFD700" />
            <Text style={styles.ratingText}>{talent.rating}</Text>
            <Text style={styles.viewsText}>• {talent.profileViews} views</Text>
          </View>
        </View>

        <View style={styles.talentActions}>
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={() => toggleBookmark(talent.id)}
          >
            <Bookmark
              color={bookmarkedTalents.has(talent.id) ? '#FFD700' : '#C0C0C0'}
              size={20}
              fill={bookmarkedTalents.has(talent.id) ? '#FFD700' : 'transparent'}
            />
          </TouchableOpacity>
          <Text style={styles.availabilityText}>{talent.availability}</Text>
        </View>
      </View>

      <View style={styles.specializationsContainer}>
        {talent.specializations.map((spec, index) => (
          <View key={index} style={styles.specializationChip}>
            <Text style={styles.specializationText}>{spec}</Text>
          </View>
        ))}
      </View>

      <View style={styles.languagesContainer}>
        <Text style={styles.languagesLabel}>Languages: </Text>
        <Text style={styles.languagesText}>{talent.languages.join(', ')}</Text>
      </View>

      {talent.recentWork.length > 0 && (
        <View style={styles.recentWorkContainer}>
          <Text style={styles.recentWorkLabel}>Recent Work:</Text>
          <Text style={styles.recentWorkText}>{talent.recentWork.join(', ')}</Text>
        </View>
      )}

      <View style={styles.talentFooter}>
        <View style={styles.portfolioInfo}>
          <Text style={styles.portfolioCount}>{talent.portfolioCount} portfolio items</Text>
          {talent.videoReelUrl && (
            <View style={styles.videoIndicator}>
              <PlayCircle color="#FFD700" size={14} />
              <Text style={styles.videoText}>Demo Reel</Text>
            </View>
          )}
        </View>

        <View style={styles.footerActions}>
          <TouchableOpacity style={styles.viewButton}>
            <Eye color="#C0C0C0" size={16} />
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton}>
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              style={styles.contactGradient}
            >
              <MessageCircle color="#000000" size={16} />
              <Text style={styles.contactButtonText}>Contact</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#000000', '#1a1a1a']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Discover Talent</Text>
              <Text style={styles.headerTitle}>Find Perfect Cast</Text>
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
                placeholder="Search by name, skills, location..."
                placeholderTextColor="#666666"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>
        </View>

        {/* Quick Filters */}
        {/* <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {Object.entries(filters).map(([filterKey, options]) => (
            <View key={filterKey} style={styles.filterGroup}>
              <Text style={styles.filterLabel}>{filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterOptions}
              >
                {options.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.filterChip,
                      selectedFilters[filterKey as keyof typeof selectedFilters] === option && styles.selectedFilter
                    ]}
                    onPress={() => setSelectedFilters(prev => ({
                      ...prev,
                      [filterKey]: option
                    }))}
                  >
                    <Text style={[
                      styles.filterText,
                      selectedFilters[filterKey as keyof typeof selectedFilters] === option && styles.selectedFilterText
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ))}
        </ScrollView> */}

        {/* Talents List */}
        <ScrollView
          style={styles.talentsList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.talentsContent}
        >
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsCount}>{talents.length} talents found</Text>
            <TouchableOpacity style={styles.sortButton}>
              <Text style={styles.sortText}>Sort by Rating</Text>
            </TouchableOpacity>
          </View>

          {talents.map(renderTalentCard)}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#C0C0C0',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Playfair-Bold',
    color: '#FFFFFF',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    marginBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
  filtersContainer: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  filtersContent: {
    paddingRight: 20,
  },
  filterGroup: {
    marginRight: 20,
  },
  filterLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#C0C0C0',
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: 'row',
  },
  filterChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedFilter: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderColor: '#FFD700',
  },
  filterText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#C0C0C0',
  },
  selectedFilterText: {
    color: '#FFD700',
  },
  talentsList: {
    flex: 1,
  },
  talentsContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  resultsCount: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  sortText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#C0C0C0',
  },
  talentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  talentHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  talentImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  talentImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  verifiedBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  availabilityIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#000000',
  },
  talentInfo: {
    flex: 1,
  },
  talentName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  talentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  talentAge: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#C0C0C0',
  },
  separator: {
    fontSize: 14,
    color: '#666666',
    marginHorizontal: 8,
  },
  talentExperience: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#C0C0C0',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#C0C0C0',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    color: '#FFD700',
    marginLeft: 4,
  },
  viewsText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginLeft: 4,
  },
  talentActions: {
    alignItems: 'center',
  },
  bookmarkButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  availabilityText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#C0C0C0',
    textAlign: 'center',
  },
  specializationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  specializationChip: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  specializationText: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#FFD700',
  },
  languagesContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  languagesLabel: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  languagesText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#C0C0C0',
    flex: 1,
  },
  recentWorkContainer: {
    marginBottom: 16,
  },
  recentWorkLabel: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  recentWorkText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#C0C0C0',
    lineHeight: 18,
  },
  talentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  portfolioInfo: {
    flex: 1,
  },
  portfolioCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#C0C0C0',
    marginBottom: 4,
  },
  videoIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoText: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#FFD700',
    marginLeft: 4,
  },
  footerActions: {
    flexDirection: 'row',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  viewButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#C0C0C0',
    marginLeft: 6,
  },
  contactButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  contactGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  contactButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
    marginLeft: 6,
  },
});