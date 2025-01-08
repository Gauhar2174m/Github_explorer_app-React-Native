
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome Icon
import { StatusBar } from "react-native"; // Import StatusBar for status bar customization
import { addToFavorites, removeFromFavorites } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";

// Get screen dimensions for width and height
const { width, height } = Dimensions.get("window");

const RepositoryDetailsScreen = ({ route, navigation }) => {
  // Retrieve the repository passed through the route params
  const { repo } = route.params || {}; // Add fallback in case repo is undefined

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites); // Get favorites from Redux state

  // Handle case when the repository is unavailable
  if (!repo) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Repository details are unavailable</Text>
      </SafeAreaView>
    );
  }

  // Check if the repository is already in the favorites list
  const isFavorite = favorites.some((item) => item.id === repo.id);

  // Function to toggle the repository in the favorites list
  const handleFavoriteToggle = () => {
    if (isFavorite) {
      // If the repository is already in favorites, remove it
      dispatch(removeFromFavorites(repo));
    } else {
      // If the repository is not in favorites, add it
      dispatch(addToFavorites(repo));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom StatusBar */}
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgb(82, 158, 139)"
        translucent={true}
      />

      {/* Header Section with a back button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-left"
            size={width * 0.08}
            color="#fff"
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Repository Details</Text>
      </View>

      {/* Scrollable content area */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Repository Information */}
        <View style={styles.repositoryCard}>
          <Text style={styles.repoName}>{repo.name}</Text>
          {repo.description && (
            <Text style={styles.repoDescription}>{repo.description}</Text>
          )}
          <View style={styles.statsContainer}>
            <Text style={styles.statsLabel}>Stars:</Text>
            <Text style={styles.statsText}>{repo.stargazers_count}</Text>
            <Text style={styles.statsLabel}>Forks:</Text>
            <Text style={styles.statsText}>{repo.forks_count}</Text>
            <Text style={styles.statsLabel}>Language:</Text>
            <Text style={styles.statsText}>{repo.language}</Text>
          </View>

          {/* Repository owner information */}
          <View style={styles.ownerContainer}>
            <Image
              source={{ uri: repo.owner.avatar_url }}
              style={styles.avatar}
            />
            <Text style={styles.ownerName}>{repo.owner.login}</Text>
          </View>

          {/* Button to toggle the repository between favorites */}
          <TouchableOpacity
            onPress={() => {
              handleFavoriteToggle();
              navigation.navigate("Favorites"); // Navigate to Favorites screen after toggling
            }}
            style={styles.favoriteButton}
          >
            <View style={styles.favoriteContent}>
              <Icon
                name={isFavorite ? "heart" : "heart-o"} // Show filled heart if in favorites, else an outline
                size={width * 0.06}
                color={isFavorite ? "#FFD700" : "#ccc"} // Gold if favorite, else grey
              />
              <Text style={styles.favoriteText}>
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"} {/* Button text based on favorite status */}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "rgba(107, 89, 105, 0.2))" },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(82, 158, 139)",
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05, // 5% of screen width
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginTop: 0,
  },
  headerIcon: { marginRight: width * 0.05 },
  headerText: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
    textAlign: "center",
  },
  scrollContainer: {
    paddingBottom: height * 0.02,
    paddingHorizontal: width * 0.05,
  },
  repositoryCard: {
    backgroundColor: "#adc0db",
    padding: width * 0.05,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginTop: height * 0.05,
  },
  repoName: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    color: "dark-grey",
    marginBottom: height * 0.02,
    textAlign: "center",
  },
  repoDescription: {
    fontSize: width * 0.05, 
    color: "#666",
    marginBottom: height * 0.03, 
    lineHeight: 22,
  },
  statsContainer: { marginBottom: height * 0.02 }, // 2% of screen height
  statsLabel: { fontSize: width * 0.05, fontWeight: "bold", color: "#333" }, // Adjust font size and spacing
  statsText: {
    fontSize: width * 0.05,
    color: "#333",
    marginBottom: height * 0.01,
  }, // Adjust font size and spacing
  ownerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.03,
  }, // Adjust spacing
  avatar: {
    width: width * 0.18, 
    height: width * 0.18, 
    borderRadius: width * 0.09, 
    marginRight: width * 0.05, 
    borderWidth: 2,
    borderColor: "grey",
  },
  ownerName: {
    fontSize: width * 0.06, 
    fontWeight: "500",
    color: "#333",
  },
  favoriteButton: {
    backgroundColor: "rgb(82, 158, 139)",
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
    borderRadius: 8,
    marginTop: height * 0.03, 
    alignItems: "center",
  },
  favoriteContent: { flexDirection: "row", alignItems: "center" },
  favoriteText: {
    fontSize: width * 0.05, 
    fontWeight: "bold",
    color: "#fff",
    marginLeft: width * 0.03, 
  },
  errorText: {
    textAlign: "center",
    fontSize: width * 0.05,
    color: "red",
    marginTop: height * 0.05,
  }, 
});

export default RepositoryDetailsScreen;
