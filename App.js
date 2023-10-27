import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import Home from "./app/screens/Home";
import Note from "./app/screens/Note";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RealmProvider } from "./app/config/RealmSetup";
import { LogBox } from "react-native";
import Settings from "./app/screens/Settings";
import ThemeProvider from "./app/ThemeProvider";
import StatBar from "./app/components/StatBar";
import { mmkvStorage } from "./app/config/MMKVConfig";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
  "BSON: For React Native please polyfill crypto.getRandomValues",
]);

const Stack = createStackNavigator();

export default function App() {
  if (!mmkvStorage.getBoolean("initialConfigDone")) {
    mmkvStorage.set("theme", "dark");
    mmkvStorage.set("initialConfigDone", true);
  }

  return (
    <ThemeProvider>
      <RealmProvider>
        <StatBar />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Note" component={Note} />
            <Stack.Screen name="Settings" component={Settings} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="light" />
      </RealmProvider>
    </ThemeProvider>
  );
}
