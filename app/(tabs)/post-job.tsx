import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Plus,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Film,
  Save,
  Send,
  Image as ImageIcon,
} from 'lucide-react-native';

interface CastingForm {
  title: string;
  projectName: string;
  type: string;
  description: string;
  requirements: string;
  location: string;
  budget: string;
  deadline: string;
  contactEmail: string;
  ageRange: string;
  gender: string;
  experience: string;
}

const projectTypes = ['Feature Film', 'Web Series', 'Short Film', 'Commercial', 'Theater', 'Documentary'];
const genderOptions = ['Male', 'Female', 'Any', 'Non-Binary'];
const experienceOptions = ['Fresher', '1-3 years', '3-5 years', '5+ years', 'Any'];

export default function PostJobScreen() {
  const [formData, setFormData] = useState<CastingForm>({
    title: '',
    projectName: '',
    type: 'Feature Film',
    description: '',
    requirements: '',
    location: '',
    budget: '',
    deadline: '',
    contactEmail: '',
    ageRange: '',
    gender: 'Any',
    experience: 'Any',
  });
  const [loading, setLoading] = useState(false);

  const updateFormData = (field: keyof CastingForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveDraft = () => {
    Alert.alert('Draft Saved', 'Your casting call has been saved as a draft');
  };

  const handlePublish = async () => {
    if (!formData.title || !formData.projectName || !formData.description) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Casting call published successfully!', [
        { text: 'OK', onPress: () => {
          // Reset form
          setFormData({
            title: '',
            projectName: '',
            type: 'Feature Film',
            description: '',
            requirements: '',
            location: '',
            budget: '',
            deadline: '',
            contactEmail: '',
            ageRange: '',
            gender: 'Any',
            experience: 'Any',
          });
        }}
      ]);
    }, 1500);
  };

  const renderDropdown = (
    label: string,
    value: string,
    options: string[],
    onSelect: (value: string) => void,
    icon: React.ReactNode
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.dropdownContainer}>
        {icon}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.optionsContainer}
        >
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionChip,
                value === option && styles.selectedOption
              ]}
              onPress={() => onSelect(option)}
            >
              <Text style={[
                styles.optionText,
                value === option && styles.selectedOptionText
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#000000', '#1a1a1a']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Post Casting Call</Text>
            <Text style={styles.headerSubtitle}>Find the perfect talent for your project</Text>
          </View>
          <TouchableOpacity style={styles.addMediaButton}>
            <ImageIcon color="#FFD700" size={20} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Basic Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Role Title *</Text>
              <View style={styles.inputWrapper}>
                <Users color="#C0C0C0" size={20} />
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Lead Actor, Supporting Actress"
                  placeholderTextColor="#666666"
                  value={formData.title}
                  onChangeText={(value) => updateFormData('title', value)}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Project Name *</Text>
              <View style={styles.inputWrapper}>
                <Film color="#C0C0C0" size={20} />
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Echoes of Tomorrow"
                  placeholderTextColor="#666666"
                  value={formData.projectName}
                  onChangeText={(value) => updateFormData('projectName', value)}
                />
              </View>
            </View>

            {renderDropdown(
              'Project Type',
              formData.type,
              projectTypes,
              (value) => updateFormData('type', value),
              <Film color="#C0C0C0" size={20} />
            )}
          </View>

          {/* Project Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Project Details</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Description *</Text>
              <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Describe the role, project, and what you're looking for..."
                  placeholderTextColor="#666666"
                  value={formData.description}
                  onChangeText={(value) => updateFormData('description', value)}
                  multiline
                  numberOfLines={4}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Requirements</Text>
              <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Age range, experience level, special skills, etc."
                  placeholderTextColor="#666666"
                  value={formData.requirements}
                  onChangeText={(value) => updateFormData('requirements', value)}
                  multiline
                  numberOfLines={3}
                />
              </View>
            </View>
          </View>

          {/* Casting Criteria */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Casting Criteria</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Age Range</Text>
              <View style={styles.inputWrapper}>
                <Calendar color="#C0C0C0" size={20} />
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 25-35 years"
                  placeholderTextColor="#666666"
                  value={formData.ageRange}
                  onChangeText={(value) => updateFormData('ageRange', value)}
                />
              </View>
            </View>

            {renderDropdown(
              'Gender',
              formData.gender,
              genderOptions,
              (value) => updateFormData('gender', value),
              <Users color="#C0C0C0" size={20} />
            )}

            {renderDropdown(
              'Experience Level',
              formData.experience,
              experienceOptions,
              (value) => updateFormData('experience', value),
              <Clock color="#C0C0C0" size={20} />
            )}
          </View>

          {/* Logistics */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Logistics</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Location</Text>
              <View style={styles.inputWrapper}>
                <MapPin color="#C0C0C0" size={20} />
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Mumbai, India"
                  placeholderTextColor="#666666"
                  value={formData.location}
                  onChangeText={(value) => updateFormData('location', value)}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Budget Range</Text>
              <View style={styles.inputWrapper}>
                <DollarSign color="#C0C0C0" size={20} />
                <TextInput
                  style={styles.input}
                  placeholder="e.g., ₹50,000 - ₹1,00,000"
                  placeholderTextColor="#666666"
                  value={formData.budget}
                  onChangeText={(value) => updateFormData('budget', value)}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Application Deadline</Text>
              <View style={styles.inputWrapper}>
                <Calendar color="#C0C0C0" size={20} />
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 2024-02-15"
                  placeholderTextColor="#666666"
                  value={formData.deadline}
                  onChangeText={(value) => updateFormData('deadline', value)}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Contact Email</Text>
              <View style={styles.inputWrapper}>
                <Users color="#C0C0C0" size={20} />
                <TextInput
                  style={styles.input}
                  placeholder="casting@yourcompany.com"
                  placeholderTextColor="#666666"
                  value={formData.contactEmail}
                  onChangeText={(value) => updateFormData('contactEmail', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.draftButton}
              onPress={handleSaveDraft}
            >
              <Save color="#C0C0C0" size={20} />
              <Text style={styles.draftButtonText}>Save Draft</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.publishButton}
              onPress={handlePublish}
              disabled={loading}
            >
              <LinearGradient
                colors={['#FFD700', '#FFA500']}
                style={styles.gradientButton}
              >
                <Send color="#000000" size={20} />
                <Text style={styles.publishButtonText}>
                  {loading ? 'Publishing...' : 'Publish Casting'}
                </Text>
              </LinearGradient>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Playfair-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#C0C0C0',
  },
  addMediaButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    minHeight: 56,
  },
  textAreaWrapper: {
    alignItems: 'flex-start',
    paddingVertical: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  textArea: {
    marginLeft: 0,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingLeft: 16,
    minHeight: 56,
  },
  optionsContainer: {
    paddingRight: 16,
    paddingVertical: 8,
  },
  optionChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  selectedOption: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderColor: '#FFD700',
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#C0C0C0',
  },
  selectedOptionText: {
    color: '#FFD700',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  draftButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 28,
    paddingVertical: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  draftButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#C0C0C0',
    marginLeft: 8,
  },
  publishButton: {
    flex: 2,
    borderRadius: 28,
    overflow: 'hidden',
    marginLeft: 8,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  publishButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
    marginLeft: 8,
  },
});