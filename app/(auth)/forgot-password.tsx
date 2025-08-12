import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Mail, CircleCheck as CheckCircle } from 'lucide-react-native';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setEmailSent(true);
    }, 1500);
  };

  const handleBackToLogin = () => {
    router.push('/(auth)/login');
  };

  if (emailSent) {
    return (
      <LinearGradient
        colors={['#000000', '#1a1a1a']}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.successContainer}>
            <View style={styles.successIcon}>
              <CheckCircle color="#FFD700" size={64} />
            </View>
            <Text style={styles.successTitle}>Check Your Email</Text>
            <Text style={styles.successMessage}>
              We've sent a password reset link to {email}
            </Text>
            <Text style={styles.successSubMessage}>
              Please check your email and follow the instructions to reset your password.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackToLogin}
          >
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              style={styles.gradientButton}
            >
              <Text style={styles.backButtonText}>Back to Login</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#000000', '#1a1a1a']}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backIconButton}
            onPress={() => router.back()}
          >
            <ArrowLeft color="#FFFFFF" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Forgot Password</Text>
          <Text style={styles.headerSubtitle}>
            Enter your email address and we'll send you a link to reset your password
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Mail color="#C0C0C0" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email address"
                placeholderTextColor="#666666"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetPassword}
            disabled={loading}
          >
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              style={styles.gradientButton}
            >
              <Text style={styles.resetButtonText}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Back to Login */}
        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.loginLinkText}>Remember your password? Sign In</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 24,
    paddingTop: 60,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
  },
  backIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Playfair-Bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#C0C0C0',
    lineHeight: 24,
  },
  form: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
  resetButton: {
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
  },
  gradientButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
  },
  loginLink: {
    alignItems: 'center',
  },
  loginLinkText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#C0C0C0',
    textDecorationLine: 'underline',
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  successIcon: {
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 28,
    fontFamily: 'Playfair-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  successSubMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#C0C0C0',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
  },
});