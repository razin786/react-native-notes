import { View } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import Constants from "expo-constants";
import colors from "../config/colors";
import { useContext } from "react";
import { ThemeContext } from "../ThemeProvider";

export default function StatBar() {
  const theme = useContext(ThemeContext).currentTheme;
  NavigationBar.setBackgroundColorAsync(colors[theme].secondary);
  return (
    <View
      style={{
        height: Constants.statusBarHeight,
        backgroundColor: colors[theme].secondary,
      }}
    />
  );
}
