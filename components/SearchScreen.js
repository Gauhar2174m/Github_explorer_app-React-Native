import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions
} from "react-native";
import { IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";


const { width, height } = Dimensions.get("window");

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState(""); // State to store the search query
  const [repositories, setRepositories] = useState([]); // State to store fetched repositories
  const [loading, setLoading] = useState(false); // State to track loading state
  const [error, setError] = useState(null); // State to track errors during the fetch

  // Function to fetch repositories based on search query
  const searchRepositories = async () => {
    setRepositories([]); // Reset repositories before new search
    setLoading(true); // Set loading to true when search starts
    setError(null); // Reset error state

    try {
      // Make a fetch request to GitHub API to search for repositories
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}+in:name`
      );
      const data = await response.json(); // Parse the response data

      if (response.ok) {
        // If the response is successful, set the repositories state
        setRepositories(data.items);
      } else {
        // If the response is not successful, set an error message
        setError("Failed to fetch repositories. Please try again later.");
      }
    } catch (err) {
      // Handle any errors that occur during fetch
      setError("Failed to fetch repositories. Please try again later.");
    }
    setLoading(false); // Set loading to false once the fetch completes
  };

  // Function to render each repository in the list
  const renderItem = ({ item }) => {
    return (
      <View style={styles.Repositoryview}>
        <Text style={styles.repoName}>{item.name}</Text> {/* Display repository name */}
        <Text style={styles.repoDescription}>{item.description}</Text> {/* Display repository description */}
        
        {/* View Details button that navigates to a repository details screen */}
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => navigation.navigate("RepositoryDetails", { repo: item })}
        >
          <Icon name="visibility" size={width * 0.05} color="#fff" />
          <Text style={styles.btnText}> View Details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="rgb(82, 158, 139)" translucent={true} />

      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Search Repository</Text>
      </View>

      {/* Search Input Field */}
      <View style={styles.inputfield}>
        <TextInput
          style={styles.search}
          placeholder="Search repositories"
          value={query}
          onChangeText={(text) => setQuery(text)} // Update query state when text changes
        />
        <IconButton icon="magnify" size={width * 0.08} onPress={() => console.log("Search pressed")} style={styles.icon} />
      </View>

      {/* Search Button */}
      <TouchableOpacity onPress={searchRepositories} style={styles.Button}>
        <Text style={styles.Buttontext}>Search</Text>
      </TouchableOpacity>

      {/* Error Message Display */}
      {error && <Text style={styles.error}>{error}</Text>}

      {/* Loading Indicator or Repository List */}
      {loading ? (
        <Text>Loading...</Text> // Display loading text while fetching data
      ) : (
        <FlatList
          contentContainerStyle={styles.FlatListContent}
          data={repositories} // Data to display in the FlatList
          keyExtractor={(item) => item.id.toString()} // Key extractor for FlatList
          renderItem={renderItem} // Render each repository using renderItem
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(107, 89, 105, 0.2)",
  },
  FlatListContent: {
    paddingHorizontal: width * 0.05, 
    marginTop: height * 0.05, // 5% of screen height
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(82, 158, 139)",
    paddingVertical: height * 0.02, // 3% of screen height
    elevation: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
  },
  headerText: {
    fontSize: width * 0.05, // 5% of screen width
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    flex: 1,
  },
  inputfield: {
    height: height * 0.07, // 7% of screen height
    width: "94%",
    borderWidth: 2,
    borderColor: "grey",
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: height * 0.02, // 2% of screen height
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.04, // 4% of screen width
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  search: {
    flex: 1,
    fontSize: width * 0.04, // 4% of screen width
    paddingLeft: width * 0.05, // 5% of screen width
    paddingRight: width * 0.1, // 10% of screen width for icon space
  },
  Button: {
    height: height * 0.05, 
    width: "90%",
    marginTop: height * 0.02, 
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "rgb(82, 158, 139)",
    justifyContent: "center",
  },
  Repositoryview: {
    backgroundColor: "#adc0db",
    padding: width * 0.05, 
    marginVertical: height * 0.02, 
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  Buttontext: {
    fontSize: width * 0.06, 
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  icon: {
    position: "absolute",
    right: width * 0.02, 
    marginLeft: width * 0.05, 
  },
  viewButton: {
    flexDirection: "row",
    backgroundColor: "rgb(82, 158, 139)",
    paddingHorizontal: width * 0.05, 
    paddingVertical:height *0.01,
    borderRadius: 5,
    marginTop: height * 0.02, 
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    marginLeft: width * 0.02, 
    fontWeight: "500",
    fontSize: width * 0.04,
  },
  error: {
    color: "red",
    fontSize: width * 0.04, 
  },
  repoName: {
    fontSize: width * 0.05, 
    fontWeight: "600",
  },
  repoDescription: {
    fontSize: width * 0.04, 
    fontWeight: "400",
    marginTop: height * 0.01, 
  },
});

export default SearchScreen;
