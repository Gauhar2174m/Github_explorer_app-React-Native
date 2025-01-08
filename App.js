import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import NavigationScreen from "./components/navigationScreen";
const App = () => {
  return (
    <Provider store={store}>
      <NavigationScreen />
    </Provider>
  );
};

export default App;
