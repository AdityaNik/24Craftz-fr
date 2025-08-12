import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bell,
  BellOff,
  Settings,
  Briefcase,
  MessageCircle,
  Star,
  Heart,
  CircleCheck as CheckCircle,
  CircleAlert as AlertCircle,
  Calendar,
  Users,
  Filter,
} from "lucide-react-native";

interface Notification {
  id: string;
  type: "job" | "application" | "message" | "review" | "system" | "reminder";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
  actionRequired?: boolean;
  priority: "high" | "medium" | "low";
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "application",
    title: "Application Status Update",
    message:
      'Your application for "Lead Actor - Echoes of Tomorrow" has been shortlisted for audition!',
    timestamp: "2 minutes ago",
    read: false,
    avatar:
      "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100",
    actionRequired: true,
    priority: "high",
  },
  {
    id: "2",
    type: "job",
    title: "New Job Match",
    message:
      'A new casting call for "City Lights Web Series" matches your profile perfectly.',
    timestamp: "15 minutes ago",
    read: false,
    priority: "medium",
  },
  {
    id: "3",
    type: "message",
    title: "Message from Stellar Productions",
    message:
      "We would like to schedule an audition for the lead role. Please check your messages.",
    timestamp: "1 hour ago",
    read: true,
    avatar:
      "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=100",
    actionRequired: true,
    priority: "high",
  },
  {
    id: "4",
    type: "review",
    title: "Profile Review",
    message:
      "Someone liked your portfolio! Your profile has received 5 new views today.",
    timestamp: "3 hours ago",
    read: true,
    priority: "low",
  },
  {
    id: "5",
    type: "reminder",
    title: "Audition Reminder",
    message:
      'Don\'t forget your audition tomorrow at 2:00 PM for "The Last Letter" short film.',
    timestamp: "5 hours ago",
    read: false,
    actionRequired: true,
    priority: "high",
  },
  {
    id: "6",
    type: "system",
    title: "App Update Available",
    message:
      "New features available! Update to the latest version for enhanced experience.",
    timestamp: "1 day ago",
    read: true,
    priority: "low",
  },
];

const getNotificationIcon = (type: string, priority: string) => {
  const iconProps = {
    size: 20,
    color: priority === "high" ? "#FFD700" : "#C0C0C0",
  };

  switch (type) {
    case "job":
      return <Briefcase {...iconProps} />;
    case "application":
      return <CheckCircle {...iconProps} />;
    case "message":
      return <MessageCircle {...iconProps} />;
    case "review":
      return <Star {...iconProps} />;
    case "reminder":
      return <Calendar {...iconProps} />;
    case "system":
      return <AlertCircle {...iconProps} />;
    default:
      return <Bell {...iconProps} />;
  }
};

export default function NotificationsScreen() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread" | "important">("all");

  return (
    <View style={{ backgroundColor: "#000000", flex: 1 }}>
      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 20,
          fontFamily: "Inter-Bold",
          marginTop: 40,
        }}
      >
        Yet to come...
      </Text>
    </View>
  );

//   const markAsRead = (notificationId: string) => {
//     setNotifications((prev) =>
//       prev.map((notif) =>
//         notif.id === notificationId ? { ...notif, read: true } : notif
//       )
//     );
//   };

//   const markAllAsRead = () => {
//     setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
//   };

//   const filteredNotifications = notifications.filter((notif) => {
//     switch (filter) {
//       case "unread":
//         return !notif.read;
//       case "important":
//         return notif.priority === "high" || notif.actionRequired;
//       default:
//         return true;
//     }
//   });

//   const unreadCount = notifications.filter((n) => !n.read).length;

//   const renderNotificationCard = (notification: Notification) => (
//     <TouchableOpacity
//       key={notification.id}
//       style={[
//         styles.notificationCard,
//         !notification.read && styles.unreadCard,
//         notification.priority === "high" && styles.highPriorityCard,
//       ]}
//       onPress={() => markAsRead(notification.id)}
//     >
//       <View style={styles.notificationContent}>
//         <View style={styles.notificationHeader}>
//           <View style={styles.iconContainer}>
//             {getNotificationIcon(notification.type, notification.priority)}
//           </View>

//           {notification.avatar && (
//             <Image
//               source={{ uri: notification.avatar }}
//               style={styles.avatar}
//             />
//           )}

//           <View style={styles.notificationInfo}>
//             <Text
//               style={[
//                 styles.notificationTitle,
//                 !notification.read && styles.unreadTitle,
//               ]}
//             >
//               {notification.title}
//             </Text>
//             <Text style={styles.timestamp}>{notification.timestamp}</Text>
//           </View>

//           {!notification.read && <View style={styles.unreadDot} />}
//         </View>

//         <Text style={styles.notificationMessage}>{notification.message}</Text>

//         {notification.actionRequired && (
//           <View style={styles.actionContainer}>
//             <TouchableOpacity style={styles.actionButton}>
//               <Text style={styles.actionButtonText}>Take Action</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>

//       {notification.priority === "high" && (
//         <View style={styles.priorityIndicator} />
//       )}
//     </TouchableOpacity>
//   );

//   return (
//     <LinearGradient colors={["#000000", "#1a1a1a"]} style={styles.container}>
//       <SafeAreaView style={styles.safeArea}>
//         {/* Header */}
//         <View style={styles.header}>
//           <View style={styles.headerTop}>
//             <View>
//               <Text style={styles.greeting}>Stay Updated</Text>
//               <Text style={styles.headerTitle}>Notifications</Text>
//             </View>
//             <View style={styles.headerActions}>
//               <TouchableOpacity style={styles.iconButton}>
//                 <Filter color="#FFFFFF" size={20} />
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.iconButton}>
//                 <Settings color="#FFFFFF" size={20} />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Stats */}
//           <View style={styles.statsContainer}>
//             <View style={styles.statItem}>
//               <Bell color="#FFD700" size={16} />
//               <Text style={styles.statText}>{unreadCount} unread</Text>
//             </View>
//             <TouchableOpacity
//               style={styles.markAllButton}
//               onPress={markAllAsRead}
//             >
//               <CheckCircle color="#C0C0C0" size={16} />
//               <Text style={styles.markAllText}>Mark all read</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Filter Tabs */}
//         <View style={styles.filterContainer}>
//           {[
//             { key: "all", label: "All", count: notifications.length },
//             { key: "unread", label: "Unread", count: unreadCount },
//             {
//               key: "important",
//               label: "Important",
//               count: notifications.filter((n) => n.priority === "high").length,
//             },
//           ].map((filterOption) => (
//             <TouchableOpacity
//               key={filterOption.key}
//               style={[
//                 styles.filterTab,
//                 filter === filterOption.key && styles.activeFilterTab,
//               ]}
//               onPress={() => setFilter(filterOption.key as any)}
//             >
//               <Text
//                 style={[
//                   styles.filterTabText,
//                   filter === filterOption.key && styles.activeFilterTabText,
//                 ]}
//               >
//                 {filterOption.label} ({filterOption.count})
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Notifications List */}
//         <ScrollView
//           style={styles.notificationsList}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.notificationsContent}
//         >
//           {filteredNotifications.length > 0 ? (
//             filteredNotifications.map(renderNotificationCard)
//           ) : (
//             <View style={styles.emptyState}>
//               <BellOff color="#666666" size={64} />
//               <Text style={styles.emptyStateTitle}>No notifications</Text>
//               <Text style={styles.emptyStateMessage}>
//                 {filter === "unread"
//                   ? "You're all caught up! No unread notifications."
//                   : filter === "important"
//                   ? "No important notifications at the moment."
//                   : "You don't have any notifications yet."}
//               </Text>
//             </View>
//           )}

//           {/* Quick Actions */}
//           {filteredNotifications.length > 0 && (
//             <View style={styles.quickActions}>
//               <Text style={styles.quickActionsTitle}>Quick Actions</Text>
//               <View style={styles.quickActionButtons}>
//                 <TouchableOpacity style={styles.quickActionButton}>
//                   <Users color="#FFD700" size={20} />
//                   <Text style={styles.quickActionText}>
//                     View Profile Visits
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.quickActionButton}>
//                   <Heart color="#FF4458" size={20} />
//                   <Text style={styles.quickActionText}>Check Likes</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
//         </ScrollView>
//       </SafeAreaView>
//     </LinearGradient>
//   );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   safeArea: {
//     flex: 1,
//   },
//   header: {
//     paddingHorizontal: 20,
//     paddingTop: 16,
//     paddingBottom: 16,
//   },
//   headerTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   greeting: {
//     fontSize: 14,
//     fontFamily: "Inter-Regular",
//     color: "#C0C0C0",
//     marginBottom: 4,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontFamily: "Playfair-Bold",
//     color: "#FFFFFF",
//   },
//   headerActions: {
//     flexDirection: "row",
//   },
//   iconButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "rgba(255, 255, 255, 0.1)",
//     justifyContent: "center",
//     alignItems: "center",
//     marginLeft: 8,
//   },
//   statsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   statItem: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   statText: {
//     fontSize: 14,
//     fontFamily: "Inter-Medium",
//     color: "#FFD700",
//     marginLeft: 8,
//   },
//   markAllButton: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   markAllText: {
//     fontSize: 14,
//     fontFamily: "Inter-Medium",
//     color: "#C0C0C0",
//     marginLeft: 6,
//   },
//   filterContainer: {
//     flexDirection: "row",
//     paddingHorizontal: 20,
//     marginBottom: 20,
//   },
//   filterTab: {
//     flex: 1,
//     paddingVertical: 12,
//     borderRadius: 12,
//     backgroundColor: "rgba(255, 255, 255, 0.05)",
//     marginHorizontal: 4,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "rgba(255, 255, 255, 0.1)",
//   },
//   activeFilterTab: {
//     backgroundColor: "rgba(255, 215, 0, 0.2)",
//     borderColor: "#FFD700",
//   },
//   filterTabText: {
//     fontSize: 12,
//     fontFamily: "Inter-Medium",
//     color: "#C0C0C0",
//   },
//   activeFilterTabText: {
//     color: "#FFD700",
//   },
//   notificationsList: {
//     flex: 1,
//   },
//   notificationsContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 100,
//   },
//   notificationCard: {
//     backgroundColor: "rgba(255, 255, 255, 0.05)",
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: "rgba(255, 255, 255, 0.1)",
//     position: "relative",
//   },
//   unreadCard: {
//     backgroundColor: "rgba(255, 215, 0, 0.05)",
//     borderColor: "rgba(255, 215, 0, 0.3)",
//   },
//   highPriorityCard: {
//     borderLeftWidth: 4,
//     borderLeftColor: "#FFD700",
//   },
//   notificationContent: {
//     flex: 1,
//   },
//   notificationHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   iconContainer: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: "rgba(255, 255, 255, 0.1)",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   avatar: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     marginRight: 12,
//   },
//   notificationInfo: {
//     flex: 1,
//   },
//   notificationTitle: {
//     fontSize: 16,
//     fontFamily: "Inter-SemiBold",
//     color: "#FFFFFF",
//     marginBottom: 2,
//   },
//   unreadTitle: {
//     color: "#FFD700",
//   },
//   timestamp: {
//     fontSize: 12,
//     fontFamily: "Inter-Regular",
//     color: "#666666",
//   },
//   unreadDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "#FFD700",
//   },
//   notificationMessage: {
//     fontSize: 14,
//     fontFamily: "Inter-Regular",
//     color: "#E0E0E0",
//     lineHeight: 20,
//     marginBottom: 12,
//   },
//   actionContainer: {
//     alignItems: "flex-start",
//   },
//   actionButton: {
//     backgroundColor: "rgba(255, 215, 0, 0.2)",
//     borderRadius: 16,
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderWidth: 1,
//     borderColor: "rgba(255, 215, 0, 0.4)",
//   },
//   actionButtonText: {
//     fontSize: 12,
//     fontFamily: "Inter-SemiBold",
//     color: "#FFD700",
//   },
//   priorityIndicator: {
//     position: "absolute",
//     top: 0,
//     right: 0,
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     backgroundColor: "#FFD700",
//   },
//   emptyState: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 80,
//   },
//   emptyStateTitle: {
//     fontSize: 20,
//     fontFamily: "Inter-Bold",
//     color: "#FFFFFF",
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   emptyStateMessage: {
//     fontSize: 14,
//     fontFamily: "Inter-Regular",
//     color: "#C0C0C0",
//     textAlign: "center",
//     lineHeight: 20,
//     paddingHorizontal: 32,
//   },
//   quickActions: {
//     marginTop: 24,
//     paddingTop: 24,
//     borderTopWidth: 1,
//     borderTopColor: "rgba(255, 255, 255, 0.1)",
//   },
//   quickActionsTitle: {
//     fontSize: 16,
//     fontFamily: "Inter-Bold",
//     color: "#FFFFFF",
//     marginBottom: 16,
//   },
//   quickActionButtons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   quickActionButton: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "rgba(255, 255, 255, 0.05)",
//     borderRadius: 12,
//     paddingVertical: 12,
//     marginHorizontal: 4,
//     borderWidth: 1,
//     borderColor: "rgba(255, 255, 255, 0.1)",
//   },
//   quickActionText: {
//     fontSize: 12,
//     fontFamily: "Inter-Medium",
//     color: "#FFFFFF",
//     marginLeft: 8,
//   },
// });
