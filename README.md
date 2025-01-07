This is a React Native app that allows users to view repository details, and add/remove repositories to/from their favorites list. It uses Redux for state management to handle the favorites list. 
The app includes two main screens:
1.Repository Search Screen: Displays list or repositories with repository name 
2.Repository Details Screen: Displays detailed information about a selected GitHub repository.
3.Favorites Screen: Displays a list of repositories added to the favorites.

Features:
Repository Details: View the repository name, description, stars, forks, language, and owner information.
Add/Remove Favorites: Add repositories to your favorites list or remove them.
Navigation: Navigate between the details screen and the favorites screen.
use stack navigation and tabs navigation
Redux State Management: Use Redux to manage the state of the favorites list across screens

Dependencies:
react-native: The core library for building the mobile app.
react-navigation: For navigating between screens (Repository Details and Favorites).
react-redux: To manage the state of the app using Redux.
redux: For state management.
react-native-safe-area-context: Provides safe area context for iOS devices with notch or curved screens.
react-native-vector-icons: Provides various icons (used FontAwesome in this project).
react-native-status-bar: Customizes the status bar for the app.

Project structure:
screens/RepositoryDetailsScreen.js: This file contains the UI and logic for the Repository Details screen.
screens/FavoritesScreen.js: This file contains the UI and logic for the Favorites screen.
redux/actions.js: This file contains the action creators for adding and removing repositories from favorites.
redux/reducer.js: The reducer that updates the Redux state for favorites.
redux/store.js: The Redux store that combines all reducers and actions.
App.js: The entry point of the React Native app, setting up navigation and Redux store.

Usage:
Search Screen :
secrch screen use for searching repository by repository name and after searching display the data 

Repository Details Screen:
When you open the app, you'll see a list of repositories (or navigate to a specific repository if linked).
You can view the repository details like name, description, stars, forks, language, and the owner's information.
You can toggle the repository to be added or removed from your favorites list.

Favorites Screen:
Navigate to the Favorites screen from the Repository Details screen to view all your saved repositories.
You can navigate back to the Repository Details screen to add or remove repositories from the favorites list
