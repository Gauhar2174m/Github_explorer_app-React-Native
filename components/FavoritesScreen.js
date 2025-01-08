import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome Icon

const { width, height } = Dimensions.get("window");

const FavoritesScreen = ({ navigation }) => {
  const favorites = useSelector((state) => state.favorites);

  const renderItem = ({ item }) => (
    <View style={styles.repositoryCard}>
      <TouchableOpacity
        onPress={() => navigation.navigate("RepositoryDetails", { repo: item })}
      >
        {/* Repository Name */}
        <Text style={styles.repoName}>{item.name}</Text>

        {/* Repository Description */}
        {item.description && (
          <Text style={styles.repoDescription}>{item.description}</Text>
        )}

        {/* Stats Container */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsLabel}>Stars: </Text>
          <Text style={styles.statsText}>{item.stargazers_count}</Text>

          <Text style={styles.statsLabel}>Forks: </Text>
          <Text style={styles.statsText}>{item.forks_count}</Text>

          <Text style={styles.statsLabel}>Language: </Text>
          <Text style={styles.statsText}>{item.language}</Text>
        </View>

        {/* Owner Info */}
        <View style={styles.ownerContainer}>
          <Image
            source={{ uri: item.owner.avatar_url }}
            style={styles.avatar}
          />
          <Text style={styles.ownerName}>{item.owner.login}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-left"
            size={width * 0.08}
            color="#fff"
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Favorites</Text>
      </View>

      {/* Favorites List */}
      {favorites.length === 0 ? (
        <Text style={styles.noFavoritesText}>No favorites added yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(107, 89, 105, 0.2))",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(82, 158, 139)",
    paddingVertical: height * 0.03, // 3% of screen height
    paddingHorizontal: width * 0.05, // 5% of screen width
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginTop: 0, // No gap at the top
  },
  headerText: {
    fontSize: width * 0.06, // 6% of screen width
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
    textAlign: "center",
  },
  repositoryCard: {
    backgroundColor: "#adc0db",
    padding: width * 0.05, 
    borderRadius: 15,
    margin: width * 0.05, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  repoName: {
    fontSize: width * 0.07, 
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
    textAlign: "center",
  },
  statsContainer: {
    marginBottom: height * 0.02, 
  },
  statsLabel: {
    fontSize: width * 0.05, 
    fontWeight: "bold",
    color: "#333",
  },
  statsText: {
    fontSize: width * 0.05, 
    color: "#333",
    marginBottom: height * 0.01, 
  },
  ownerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: height * 0.02, 
  },
  avatar: {
    width: width * 0.15, 
    height: width * 0.15, 
    borderRadius: width * 0.075, 
    marginRight: width * 0.05, 
    borderWidth: 2,
    borderColor: "grey",
  },
  ownerName: {
    fontSize: width * 0.06,
    fontWeight: "500",
    color: "#333",
  },
  noFavoritesText: {
    fontSize: width * 0.05, 
    textAlign: "center",
    color: "#888",
    marginTop: height * 0.1, 
  },
});

export default FavoritesScreen;
