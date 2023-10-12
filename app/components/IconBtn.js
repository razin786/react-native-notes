import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import { useContext } from "react";
import { ThemeContext } from "../ThemeProvider";

export default function IconBtn({ img, onBtnLongPress, onBtnPress }) {
  const theme = useContext(ThemeContext).currentTheme;
  const styles = StyleSheet.create({
    IconBtn: {
      width: 50,
      height: 50,
      backgroundColor: colors[theme].secondary,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <TouchableOpacity
      onLongPress={onBtnLongPress}
      onPress={onBtnPress}
      style={styles.IconBtn}
    >
      {img}
    </TouchableOpacity>
  );
}
