import { View, Text, StyleSheet, Pressable } from "react-native";
import colors from "../config/colors";
import IconBtn from "./IconBtn";
import SettingsIcon from "../assets/icons/Settings.svg";
import PlusIcon from "../assets/icons/Plus.svg";
import { useContext } from "react";
import { ThemeContext } from "../ThemeProvider";

export default function HomeMenuBar({
  handleAddPress,
  handleAddLongPress,
  handleSettingsPress,
  handleSettingsLongPress,
}) {
  const theme = useContext(ThemeContext).currentTheme;
  const styles = StyleSheet.create({
    homemenubar: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: colors[theme].secondary,
      justifyContent: "center",
      alignItems: "flex-end",
    },
  });
  return (
    <View style={styles.homemenubar}>
      <IconBtn
        img={<SettingsIcon width="80%" height="80%" fill={colors[theme].iconFill} />}
        onBtnPress={handleSettingsPress}
        onBtnLongPress={handleSettingsLongPress}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text style={{ color: colors[theme].textPrimary, textAlign: "center" }}>Notes</Text>
      </View>
      <IconBtn
        img={<PlusIcon width="100%" height="100%" fill={colors[theme].iconFill} />}
        onBtnPress={handleAddPress}
        onBtnLongPress={handleAddLongPress}
      />
    </View>
  );
}
