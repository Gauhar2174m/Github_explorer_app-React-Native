import React from "react";
import RepositoryDetailsScreen from "./RepositoryDetailsScreen";
import SearchScreen from "./SearchScreen";
import FavoritesScreen from "./FavoritesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // Import Bottom Tabs
import Icon from "react-native-vector-icons/MaterialIcons"; // Optional for custom tab icons

// Create Stack Navigator and Tab Navigator
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function NavigationScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RepositoryDetails"
          component={RepositoryDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Tab Navigator for Search and Favorites Screens
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Favorites") {
            iconName = "favorite";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "rgb(82, 158, 139)",
        tabBarActiveBackgroundColor: "rgb(82, 158, 139,)",
      })}
    >
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ tabBarLabel: "Search", headerShown: false }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ tabBarLabel: "Favorites", headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default NavigationScreen;
