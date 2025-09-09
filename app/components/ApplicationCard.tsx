import { LinearGradient } from "expo-linear-gradient";
import {
  Award,
  CheckCircle,
  Clock,
  Eye,
  MapPin,
  MessageCircle,
  Star,
  XCircle,
} from "lucide-react-native";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Application {
  id: string;
  applicantName: string;
  applicantImage: string;
  age: number;
  location: string;
  experience: string;
  rating: number;
  appliedFor: string;
  projectName: string;
  appliedDate: string;
  status: "pending" | "shortlisted" | "rejected" | "hired";
  skills: string[];
  portfolioItems: number;
  contactInfo: {
    email: string;
    phone: string;
  };
  coverLetter: string;
  verified: boolean;
}

const mockApplications: Application[] = [
  {
    id: "1",
    applicantName: "Priya Sharma",
    applicantImage:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300",
    age: 26,
    location: "Mumbai, India",
    experience: "3-5 years",
    rating: 4.8,
    appliedFor: "Lead Actress",
    projectName: "Echoes of Tomorrow",
    appliedDate: "2024-01-15",
    status: "pending",
    skills: ["Drama", "Romance", "Hindi", "English"],
    portfolioItems: 12,
    contactInfo: {
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
    },
    coverLetter:
      "I am excited to audition for this role as it aligns perfectly with my experience in dramatic performances...",
    verified: true,
  },
  {
    id: "2",
    applicantName: "Arjun Patel",
    applicantImage:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
    age: 29,
    location: "Delhi, India",
    experience: "5+ years",
    rating: 4.6,
    appliedFor: "Supporting Actor",
    projectName: "City Lights",
    appliedDate: "2024-01-14",
    status: "shortlisted",
    skills: ["Action", "Drama", "Hindi", "Punjabi"],
    portfolioItems: 18,
    contactInfo: {
      email: "arjun.patel@email.com",
      phone: "+91 98765 43211",
    },
    coverLetter:
      "With over 5 years of experience in action and drama, I believe I can bring depth to this character...",
    verified: true,
  },
  {
    id: "3",
    applicantName: "Meera Nair",
    applicantImage:
      "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300",
    age: 24,
    location: "Bangalore, India",
    experience: "1-3 years",
    rating: 4.4,
    appliedFor: "Character Role",
    projectName: "The Last Letter",
    appliedDate: "2024-01-13",
    status: "rejected",
    skills: ["Drama", "Independent Films", "Tamil", "Malayalam"],
    portfolioItems: 8,
    contactInfo: {
      email: "meera.nair@email.com",
      phone: "+91 98765 43212",
    },
    coverLetter:
      "I am passionate about independent cinema and would love to contribute to this meaningful project...",
    verified: false,
  },
];

const statusColors = {
  pending: "#FFD700",
  shortlisted: "#4CAF50",
  rejected: "#FF4458",
  hired: "#00BCD4",
};

const statusIcons = {
  pending: Clock,
  shortlisted: CheckCircle,
  rejected: XCircle,
  hired: Award,
};

export const renderApplicationCard = (application: Application) => {
  const StatusIcon = statusIcons[application.status];
  const [applications, setApplications] =
    useState<Application[]>(mockApplications);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const updateApplicationStatus = (
    applicationId: string,
    newStatus: Application["status"],
  ) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId ? { ...app, status: newStatus } : app,
      ),
    );
  };

  return (
    <View key={application.id} style={styles.applicationCard}>
      <View style={styles.applicationHeader}>
        <View style={styles.applicantImageContainer}>
          <Image
            source={{ uri: application.applicantImage }}
            style={styles.applicantImage}
          />
          {application.verified && (
            <View style={styles.verifiedBadge}>
              <Award color="#FFD700" size={10} />
            </View>
          )}
        </View>

        <View style={styles.applicantInfo}>
          <Text style={styles.applicantName}>{application.applicantName}</Text>
          <Text style={styles.appliedRole}>
            Applied for: {application.appliedFor}
          </Text>
          <Text style={styles.projectName}>{application.projectName}</Text>
          <View style={styles.applicantMeta}>
            <Text style={styles.metaText}>{application.age} years</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.metaText}>{application.experience}</Text>
          </View>
          <View style={styles.locationContainer}>
            <MapPin color="#C0C0C0" size={12} />
            <Text style={styles.locationText}>{application.location}</Text>
          </View>
        </View>

        <View style={styles.applicationStatus}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: `${statusColors[application.status]}20` },
            ]}
          >
            <StatusIcon color={statusColors[application.status]} size={14} />
            <Text
              style={[
                styles.statusText,
                { color: statusColors[application.status] },
              ]}
            >
              {application.status.charAt(0).toUpperCase() +
                application.status.slice(1)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.ratingContainer}>
        <Star color="#FFD700" size={14} fill="#FFD700" />
        <Text style={styles.ratingText}>{application.rating}</Text>
        <Text style={styles.portfolioText}>
          • {application.portfolioItems} portfolio items
        </Text>
      </View>

      <View style={styles.skillsContainer}>
        {application.skills.slice(0, 4).map((skill, index) => (
          <View key={index} style={styles.skillChip}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
        {application.skills.length > 4 && (
          <Text style={styles.moreSkills}>
            +{application.skills.length - 4} more
          </Text>
        )}
      </View>

      <Text style={styles.coverLetter} numberOfLines={2}>
        {application.coverLetter}
      </Text>

      <View style={styles.applicationFooter}>
        <Text style={styles.appliedDate}>
          Applied on {application.appliedDate}
        </Text>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.viewProfileButton}>
            <Eye color="#C0C0C0" size={16} />
            <Text style={styles.viewProfileText}>View</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactButton}>
            <MessageCircle color="#FFD700" size={16} />
            <Text style={styles.contactText}>Contact</Text>
          </TouchableOpacity>
        </View>
      </View>

      {application.status === "pending" && (
        <View style={styles.pendingActions}>
          <TouchableOpacity
            style={styles.rejectButton}
            onPress={() => updateApplicationStatus(application.id, "rejected")}
          >
            <XCircle color="#FF4458" size={16} />
            <Text style={styles.rejectButtonText}>Reject</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              updateApplicationStatus(application.id, "shortlisted")
            }
            style={{
              flex: 1,
              marginLeft: 8,
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <LinearGradient
              colors={["#4CAF50", "#45A049"]}
              style={styles.shortlistGradient}
            >
              <CheckCircle color="#FFFFFF" size={16} />
              <Text style={styles.shortlistButtonText}>Shortlist</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  applicationCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  applicationHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  applicantImageContainer: {
    position: "relative",
    marginRight: 16,
  },
  applicantImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "rgba(255, 215, 0, 0.3)",
  },
  verifiedBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
  },
  applicantInfo: {
    flex: 1,
  },
  applicantName: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  appliedRole: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#FFD700",
    marginBottom: 2,
  },
  projectName: {
    fontSize: 13,
    fontFamily: "Playfair-Regular",
    color: "#C0C0C0",
    marginBottom: 6,
  },
  applicantMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#C0C0C0",
  },
  separator: {
    fontSize: 12,
    color: "#666666",
    marginHorizontal: 6,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#C0C0C0",
    marginLeft: 4,
  },
  applicationStatus: {
    alignItems: "flex-end",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 11,
    fontFamily: "Inter-SemiBold",
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 13,
    fontFamily: "Inter-SemiBold",
    color: "#FFD700",
    marginLeft: 4,
  },
  portfolioText: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#666666",
    marginLeft: 4,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  skillChip: {
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginRight: 6,
    marginBottom: 4,
  },
  skillText: {
    fontSize: 10,
    fontFamily: "Inter-Medium",
    color: "#FFD700",
  },
  moreSkills: {
    fontSize: 10,
    fontFamily: "Inter-Regular",
    color: "#666666",
    alignSelf: "center",
  },
  coverLetter: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: "#E0E0E0",
    lineHeight: 18,
    marginBottom: 16,
  },
  applicationFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  appliedDate: {
    fontSize: 11,
    fontFamily: "Inter-Regular",
    color: "#666666",
  },
  actionButtons: {
    flexDirection: "row",
  },
  viewProfileButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
  },
  viewProfileText: {
    fontSize: 11,
    fontFamily: "Inter-Medium",
    color: "#C0C0C0",
    marginLeft: 4,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.3)",
  },
  contactText: {
    fontSize: 11,
    fontFamily: "Inter-Medium",
    color: "#FFD700",
    marginLeft: 4,
  },
  pendingActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  rejectButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 68, 88, 0.1)",
    borderRadius: 20,
    paddingVertical: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 68, 88, 0.3)",
  },
  rejectButtonText: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    color: "#FF4458",
    marginLeft: 6,
  },
  shortlistGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  shortlistButtonText: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    color: "#FFFFFF",
    marginLeft: 6,
  },
});
