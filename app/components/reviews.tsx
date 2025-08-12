import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Search,
  Star,
  Calendar,
  CirclePlay as PlayCircle,
  Bookmark,
  Share,
  MessageCircle,
  Heart,
  TrendingUp,
} from "lucide-react-native";

interface Review {
  id: string;
  movieTitle: string;
  poster: string;
  rating: number;
  reviewText: string;
  reviewer: string;
  reviewerAvatar: string;
  releaseDate: string;
  genre: string[];
  platform: string;
  likes: number;
  comments: number;
  timeAgo: string;
  isLiked: boolean;
  isBookmarked: boolean;
}

const mockReviews: Review[] = [
  {
    id: "1",
    movieTitle: "The Kashmir Files",
    poster:
      "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 4.5,
    reviewText:
      "A powerful and emotionally gripping film that sheds light on untold stories. Brilliant performances by the entire cast.",
    reviewer: "Rajesh Sharma",
    reviewerAvatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
    releaseDate: "2022-03-11",
    genre: ["Drama", "Thriller"],
    platform: "Theaters",
    likes: 284,
    comments: 47,
    timeAgo: "2 hours ago",
    isLiked: false,
    isBookmarked: true,
  },
  {
    id: "2",
    movieTitle: "Scam 1992: The Harshad Mehta Story",
    poster:
      "https://images.pexels.com/photos/7991678/pexels-photo-7991678.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 5.0,
    reviewText:
      "Outstanding web series! Pratik Gandhi delivers a phenomenal performance. The storytelling is gripping throughout.",
    reviewer: "Priya Nair",
    reviewerAvatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
    releaseDate: "2020-10-09",
    genre: ["Biography", "Crime", "Drama"],
    platform: "SonyLIV",
    likes: 512,
    comments: 89,
    timeAgo: "5 hours ago",
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: "3",
    movieTitle: "Arya 2",
    poster:
      "https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 4.2,
    reviewText:
      "Allu Arjun shines in this action-packed entertainer. Great cinematography and music that keeps you engaged.",
    reviewer: "Vikram Reddy",
    reviewerAvatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100",
    releaseDate: "2009-11-27",
    genre: ["Action", "Romance"],
    platform: "Amazon Prime",
    likes: 376,
    comments: 62,
    timeAgo: "1 day ago",
    isLiked: true,
    isBookmarked: true,
  },
];

const categories = [
  "All Reviews",
  "Movies",
  "Web Series",
  "Documentaries",
  "Short Films",
];
const platforms = [
  "All Platforms",
  "Netflix",
  "Amazon Prime",
  "Disney+ Hotstar",
  "SonyLIV",
  "Theaters",
];

export default function ReviewsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Reviews");
  const [reviews, setReviews] = useState<Review[]>(mockReviews);

  return(
    <View style={{backgroundColor: '#000000', flex: 1}}>
      <Text style={{color: '#FFFFFF', fontSize: 20, fontFamily: 'Inter-Bold', marginTop: 40}}>Yet to come...</Text>
    </View>
  )

  // const toggleLike = (reviewId: string) => {
  //   setReviews((prev) =>
  //     prev.map((review) =>
  //       review.id === reviewId
  //         ? {
  //             ...review,
  //             isLiked: !review.isLiked,
  //             likes: review.isLiked ? review.likes - 1 : review.likes + 1,
  //           }
  //         : review
  //     )
  //   );
  // };

  // const toggleBookmark = (reviewId: string) => {
  //   setReviews((prev) =>
  //     prev.map((review) =>
  //       review.id === reviewId
  //         ? { ...review, isBookmarked: !review.isBookmarked }
  //         : review
  //     )
  //   );
  // };

  // const renderStars = (rating: number) => {
  //   const stars = [];
  //   const fullStars = Math.floor(rating);
  //   const hasHalfStar = rating % 1 !== 0;

  //   for (let i = 0; i < fullStars; i++) {
  //     stars.push(<Star key={i} size={14} color="#FFD700" fill="#FFD700" />);
  //   }

  //   if (hasHalfStar) {
  //     stars.push(<Star key="half" size={14} color="#FFD700" fill="#FFD700" />);
  //   }

  //   const remainingStars = 5 - Math.ceil(rating);
  //   for (let i = 0; i < remainingStars; i++) {
  //     stars.push(<Star key={`empty-${i}`} size={14} color="#666666" />);
  //   }

  //   return stars;
  // };

  // const renderReviewCard = (review: Review) => (
  //   <View key={review.id} style={styles.reviewCard}>
  //     <View style={styles.reviewHeader}>
  //       <Image source={{ uri: review.poster }} style={styles.moviePoster} />
  //       <View style={styles.movieInfo}>
  //         <Text style={styles.movieTitle}>{review.movieTitle}</Text>
  //         <View style={styles.ratingContainer}>
  //           <View style={styles.starsContainer}>
  //             {renderStars(review.rating)}
  //           </View>
  //           <Text style={styles.ratingText}>{review.rating}/5</Text>
  //         </View>
  //         <View style={styles.genreContainer}>
  //           {review.genre.map((g, index) => (
  //             <View key={index} style={styles.genreChip}>
  //               <Text style={styles.genreText}>{g}</Text>
  //             </View>
  //           ))}
  //         </View>
  //         <View style={styles.platformInfo}>
  //           <PlayCircle color="#FFD700" size={12} />
  //           <Text style={styles.platformText}>{review.platform}</Text>
  //           <Calendar color="#C0C0C0" size={12} />
  //           <Text style={styles.dateText}>{review.releaseDate}</Text>
  //         </View>
  //       </View>
  //     </View>

  //     <Text style={styles.reviewText}>{review.reviewText}</Text>

  //     <View style={styles.reviewerInfo}>
  //       <Image
  //         source={{ uri: review.reviewerAvatar }}
  //         style={styles.reviewerAvatar}
  //       />
  //       <View style={styles.reviewerDetails}>
  //         <Text style={styles.reviewerName}>{review.reviewer}</Text>
  //         <Text style={styles.timeAgo}>{review.timeAgo}</Text>
  //       </View>
  //     </View>

  //     <View style={styles.reviewActions}>
  //       <TouchableOpacity
  //         style={styles.actionButton}
  //         onPress={() => toggleLike(review.id)}
  //       >
  //         <Heart
  //           color={review.isLiked ? "#FF4458" : "#C0C0C0"}
  //           size={20}
  //           fill={review.isLiked ? "#FF4458" : "transparent"}
  //         />
  //         <Text style={[styles.actionText, review.isLiked && styles.likedText]}>
  //           {review.likes}
  //         </Text>
  //       </TouchableOpacity>

  //       <TouchableOpacity style={styles.actionButton}>
  //         <MessageCircle color="#C0C0C0" size={20} />
  //         <Text style={styles.actionText}>{review.comments}</Text>
  //       </TouchableOpacity>

  //       <TouchableOpacity
  //         style={styles.actionButton}
  //         onPress={() => toggleBookmark(review.id)}
  //       >
  //         <Bookmark
  //           color={review.isBookmarked ? "#FFD700" : "#C0C0C0"}
  //           size={20}
  //           fill={review.isBookmarked ? "#FFD700" : "transparent"}
  //         />
  //       </TouchableOpacity>

  //       <TouchableOpacity style={styles.actionButton}>
  //         <Share color="#C0C0C0" size={20} />
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );

  // return (
  //   <LinearGradient colors={["#000000", "#1a1a1a"]} style={styles.container}>
  //     <SafeAreaView style={styles.safeArea}>
  //       {/* Header */}
  //       <View style={styles.header}>
  //         <View style={styles.headerTop}>
  //           <View>
  //             <Text style={styles.greeting}>Reviews & Ratings</Text>
  //             <Text style={styles.headerTitle}>Cinema Community</Text>
  //           </View>
  //           <TouchableOpacity style={styles.trendingButton}>
  //             <TrendingUp color="#FFD700" size={20} />
  //           </TouchableOpacity>
  //         </View>

  //         {/* Search Bar */}
  //         <View style={styles.searchContainer}>
  //           <View style={styles.searchBar}>
  //             <Search color="#C0C0C0" size={20} />
  //             <TextInput
  //               style={styles.searchInput}
  //               placeholder="Search movies, shows, reviews..."
  //               placeholderTextColor="#666666"
  //               value={searchQuery}
  //               onChangeText={setSearchQuery}
  //             />
  //           </View>
  //         </View>
  //       </View>

  //       {/* Categories */}
  //       {/* <ScrollView
  //         horizontal
  //         showsHorizontalScrollIndicator={false}
  //         style={styles.categoriesContainer}
  //         contentContainerStyle={styles.categoriesContent}
  //       >
  //         {categories.map((category) => (
  //           <TouchableOpacity
  //             key={category}
  //             style={[
  //               styles.categoryChip,
  //               selectedCategory === category && styles.selectedCategoryChip
  //             ]}
  //             onPress={() => setSelectedCategory(category)}
  //           >
  //             <Text style={[
  //               styles.categoryText,
  //               selectedCategory === category && styles.selectedCategoryText
  //             ]}>
  //               {category}
  //             </Text>
  //           </TouchableOpacity>
  //         ))}
  //       </ScrollView> */}

  //       {/* Reviews List */}
  //       <ScrollView
  //         style={styles.reviewsList}
  //         showsVerticalScrollIndicator={false}
  //         contentContainerStyle={styles.reviewsContent}
  //       >
  //         <View style={styles.sectionHeader}>
  //           <Text style={styles.sectionTitle}>Latest Reviews</Text>
  //           <Text style={styles.reviewsCount}>{reviews.length} reviews</Text>
  //         </View>

  //         {reviews.map(renderReviewCard)}

  //         {/* Add Review Button */}
  //         <TouchableOpacity style={styles.addReviewButton}>
  //           <LinearGradient
  //             colors={["#FFD700", "#FFA500"]}
  //             style={styles.gradientButton}
  //           >
  //             <Star color="#000000" size={20} />
  //             <Text style={styles.addReviewText}>Write a Review</Text>
  //           </LinearGradient>
  //         </TouchableOpacity>
  //       </ScrollView>
  //     </SafeAreaView>
  //   </LinearGradient>
  // );
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
//     marginBottom: 20,
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
//   trendingButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "rgba(255, 215, 0, 0.1)",
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "rgba(255, 215, 0, 0.3)",
//   },
//   searchContainer: {
//     marginBottom: 8,
//   },
//   searchBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(255, 255, 255, 0.05)",
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     height: 48,
//     borderWidth: 1,
//     borderColor: "rgba(255, 255, 255, 0.1)",
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 12,
//     fontSize: 16,
//     fontFamily: "Inter-Regular",
//     color: "#FFFFFF",
//   },
//   categoriesContainer: {
//     paddingLeft: 20,
//     marginBottom: 20,
//   },
//   categoriesContent: {
//     paddingRight: 20,
//   },
//   categoryChip: {
//     backgroundColor: "rgba(255, 255, 255, 0.05)",
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginRight: 12,
//     borderWidth: 1,
//     borderColor: "rgba(255, 255, 255, 0.1)",
//   },
//   selectedCategoryChip: {
//     backgroundColor: "rgba(255, 215, 0, 0.2)",
//     borderColor: "#FFD700",
//   },
//   categoryText: {
//     fontSize: 14,
//     fontFamily: "Inter-Medium",
//     color: "#C0C0C0",
//   },
//   selectedCategoryText: {
//     color: "#FFD700",
//   },
//   reviewsList: {
//     flex: 1,
//   },
//   reviewsContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 100,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontFamily: "Inter-Bold",
//     color: "#FFFFFF",
//   },
//   reviewsCount: {
//     fontSize: 14,
//     fontFamily: "Inter-Regular",
//     color: "#C0C0C0",
//   },
//   reviewCard: {
//     backgroundColor: "rgba(255, 255, 255, 0.05)",
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: "rgba(255, 255, 255, 0.1)",
//   },
//   reviewHeader: {
//     flexDirection: "row",
//     marginBottom: 16,
//   },
//   moviePoster: {
//     width: 80,
//     height: 120,
//     borderRadius: 8,
//     marginRight: 16,
//   },
//   movieInfo: {
//     flex: 1,
//   },
//   movieTitle: {
//     fontSize: 18,
//     fontFamily: "Inter-Bold",
//     color: "#FFFFFF",
//     marginBottom: 8,
//   },
//   ratingContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   starsContainer: {
//     flexDirection: "row",
//     marginRight: 8,
//   },
//   ratingText: {
//     fontSize: 14,
//     fontFamily: "Inter-SemiBold",
//     color: "#FFD700",
//   },
//   genreContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginBottom: 8,
//   },
//   genreChip: {
//     backgroundColor: "rgba(255, 215, 0, 0.1)",
//     borderRadius: 12,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     marginRight: 6,
//     marginBottom: 4,
//   },
//   genreText: {
//     fontSize: 11,
//     fontFamily: "Inter-Medium",
//     color: "#FFD700",
//   },
//   platformInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     flexWrap: "wrap",
//   },
//   platformText: {
//     fontSize: 12,
//     fontFamily: "Inter-Medium",
//     color: "#FFD700",
//     marginLeft: 4,
//     marginRight: 12,
//   },
//   dateText: {
//     fontSize: 12,
//     fontFamily: "Inter-Regular",
//     color: "#C0C0C0",
//     marginLeft: 4,
//   },
//   reviewText: {
//     fontSize: 15,
//     fontFamily: "Inter-Regular",
//     color: "#E0E0E0",
//     lineHeight: 22,
//     marginBottom: 16,
//   },
//   reviewerInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   reviewerAvatar: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     marginRight: 12,
//   },
//   reviewerDetails: {
//     flex: 1,
//   },
//   reviewerName: {
//     fontSize: 14,
//     fontFamily: "Inter-SemiBold",
//     color: "#FFFFFF",
//   },
//   timeAgo: {
//     fontSize: 12,
//     fontFamily: "Inter-Regular",
//     color: "#666666",
//   },
//   reviewActions: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingTop: 16,
//     borderTopWidth: 1,
//     borderTopColor: "rgba(255, 255, 255, 0.1)",
//   },
//   actionButton: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   actionText: {
//     fontSize: 12,
//     fontFamily: "Inter-Medium",
//     color: "#C0C0C0",
//     marginLeft: 6,
//   },
//   likedText: {
//     color: "#FF4458",
//   },
//   addReviewButton: {
//     borderRadius: 28,
//     overflow: "hidden",
//     marginTop: 20,
//   },
//   gradientButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 16,
//   },
//   addReviewText: {
//     fontSize: 16,
//     fontFamily: "Inter-SemiBold",
//     color: "#000000",
//     marginLeft: 8,
//   },
// });
