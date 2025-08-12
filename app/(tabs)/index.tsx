import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  Bookmark,
  Share,
  Send,
  Calendar,
  Users,
  Star,
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Job {
  id: string;
  title: string;
  projectName: string;
  type: string;
  location: string;
  budget: string;
  deadline: string;
  company: string;
  companyLogo: string;
  requirements: string[];
  description: string;
  postedTime: string;
  applicants: number;
  featured: boolean;
  rating: number;
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Lead Actor - Drama Film',
    projectName: 'Echoes of Tomorrow',
    type: 'Feature Film',
    location: 'Mumbai, India',
    budget: '₹50,000 - ₹1,00,000',
    deadline: '2024-02-15',
    company: 'Stellar Productions',
    companyLogo: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100',
    requirements: ['Male, 25-35 years', 'Theatre experience', 'Hindi & English fluent'],
    description: 'Seeking a talented lead actor for an upcoming drama film about human connections in the digital age.',
    postedTime: '2 hours ago',
    applicants: 47,
    featured: true,
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Supporting Actress - Web Series',
    projectName: 'City Lights',
    type: 'Web Series',
    location: 'Delhi, India',
    budget: '₹25,000 - ₹40,000',
    deadline: '2024-02-20',
    company: 'Digital Dreams',
    companyLogo: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=100',
    requirements: ['Female, 22-30 years', 'Previous acting experience', 'Comfortable with bold scenes'],
    description: 'Looking for a supporting actress for a contemporary web series exploring urban relationships.',
    postedTime: '5 hours ago',
    applicants: 32,
    featured: false,
    rating: 4.5,
  },
  {
    id: '3',
    title: 'Character Actor - Short Film',
    projectName: 'The Last Letter',
    type: 'Short Film',
    location: 'Bangalore, India',
    budget: '₹15,000 - ₹25,000',
    deadline: '2024-02-12',
    company: 'Indie Collective',
    companyLogo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100',
    requirements: ['Any gender, 40-60 years', 'Expressive face', 'Regional language'],
    description: 'Seeking a character actor for an emotional short film about family bonds and forgiveness.',
    postedTime: '1 day ago',
    applicants: 18,
    featured: false,
    rating: 4.3,
  },
];

export default function JobsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs] = useState<Job[]>(mockJobs);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Set<string>>(new Set());
  const token = AsyncStorage.getItem('token');
  console.log('token ' + token.then((value) => {
    console.log(value);
  }));

  const toggleBookmark = (jobId: string) => {
    setBookmarkedJobs(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(jobId)) {
        newBookmarks.delete(jobId);
      } else {
        newBookmarks.add(jobId);
      }
      return newBookmarks;
    });
  };

  const renderJobCard = (job: Job) => (
    <View key={job.id} style={[styles.jobCard, job.featured && styles.featuredCard]}>
      {job.featured && (
        <View style={styles.featuredBadge}>
          <Star color="#000000" size={12} />
          <Text style={styles.featuredText}>Featured</Text>
        </View>
      )}

      <View style={styles.jobHeader}>
        <Image source={{ uri: job.companyLogo }} style={styles.companyLogo} />
        <View style={styles.jobHeaderContent}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.projectName}>{job.projectName}</Text>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{job.company}</Text>
            <View style={styles.ratingContainer}>
              <Star color="#FFD700" size={12} fill="#FFD700" />
              <Text style={styles.ratingText}>{job.rating}</Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.jobDescription}>{job.description}</Text>

      <View style={styles.jobDetails}>
        <View style={styles.detailItem}>
          <MapPin color="#C0C0C0" size={16} />
          <Text style={styles.detailText}>{job.location}</Text>
        </View>
        <View style={styles.detailItem}>
          <DollarSign color="#C0C0C0" size={16} />
          <Text style={styles.detailText}>{job.budget}</Text>
        </View>
        <View style={styles.detailItem}>
          <Calendar color="#C0C0C0" size={16} />
          <Text style={styles.detailText}>Deadline: {job.deadline}</Text>
        </View>
        <View style={styles.detailItem}>
          <Users color="#C0C0C0" size={16} />
          <Text style={styles.detailText}>{job.applicants} applicants</Text>
        </View>
      </View>

      <View style={styles.requirementsContainer}>
        <Text style={styles.requirementsTitle}>Requirements:</Text>
        {job.requirements.map((req, index) => (
          <Text key={index} style={styles.requirementItem}>• {req}</Text>
        ))}
      </View>

      <View style={styles.jobActions}>
        <View style={styles.leftActions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => toggleBookmark(job.id)}
          >
            <Bookmark
              color={bookmarkedJobs.has(job.id) ? '#FFD700' : '#C0C0C0'}
              size={20}
              fill={bookmarkedJobs.has(job.id) ? '#FFD700' : 'transparent'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Share color="#C0C0C0" size={20} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.applyButton}>
          <LinearGradient
            colors={['#FFD700', '#FFA500']}
            style={styles.gradientButton}
          >
            <Send color="#000000" size={16} />
            <Text style={styles.applyButtonText}>Apply Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.jobFooter}>
        <Text style={styles.postedTime}>Posted {job.postedTime}</Text>
        <View style={styles.jobType}>
          <Text style={styles.jobTypeText}>{job.type}</Text>
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
              <Text style={styles.greeting}>Good Morning</Text>
              <Text style={styles.headerTitle}>Find Your Next Role</Text>
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
                placeholder="Search jobs, projects, companies..."
                placeholderTextColor="#666666"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>
        </View>

        {/* Job Categories */}
        {/* <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {['All Jobs', 'Feature Films', 'Web Series', 'Short Films', 'Theater', 'Commercials'].map((category) => (
            <TouchableOpacity key={category} style={styles.categoryChip}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView> */}

        {/* Jobs List */}
        <ScrollView
          style={styles.jobsList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.jobsContent}
        >
          <View style={styles.jobsHeader}>
            <Text style={styles.jobsCount}>{jobs.length} opportunities available</Text>
            <TouchableOpacity style={styles.sortButton}>
              <Clock color="#C0C0C0" size={16} />
              <Text style={styles.sortText}>Latest</Text>
            </TouchableOpacity>
          </View>

          {jobs.map(renderJobCard)}
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
  categoriesContainer: {
    paddingLeft: 20,
    marginBottom: 10,
    height: 0
  },
  categoriesContent: {
    paddingRight: 20,
    alignContent: 'center'
  },
  categoryChip: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    height: 36,
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFD700',
  },
  jobsList: {
    flex: 1,
  },
  jobsContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  jobsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  jobsCount: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#C0C0C0',
    marginLeft: 6,
  },
  jobCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  featuredCard: {
    borderColor: '#FFD700',
    backgroundColor: 'rgba(255, 215, 0, 0.05)',
    marginBottom: 20
  },
  featuredBadge: {
    position: 'absolute',
    top: 10,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  featuredText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    marginLeft: 4,
  },
  jobHeader: {
    flexDirection: 'row',
    marginBottom: 12,
    marginTop: 12
  },
  companyLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  jobHeaderContent: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  projectName: {
    fontSize: 16,
    fontFamily: 'Playfair-Regular',
    color: '#FFD700',
    marginBottom: 4,
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  companyName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#C0C0C0',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFD700',
    marginLeft: 4,
  },
  jobDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#E0E0E0',
    lineHeight: 20,
    marginBottom: 16,
  },
  jobDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#C0C0C0',
    marginLeft: 8,
  },
  requirementsContainer: {
    marginBottom: 20,
  },
  requirementsTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  requirementItem: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#C0C0C0',
    marginBottom: 4,
  },
  jobActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  leftActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  applyButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  applyButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
    marginLeft: 8,
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  postedTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  jobType: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  jobTypeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFD700',
  },
});