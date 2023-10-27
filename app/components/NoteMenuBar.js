import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import IconBtn from "./IconBtn";
import BackIcon from "../assets/icons/Back.svg";
import SaveIcon from "../assets/icons/Save.svg";
import { useRealm } from "../config/RealmSetup";
import { useContext } from "react";
import { ThemeContext } from "../ThemeProvider";

export default function NoteMenuBar({ navigation, handleSavePress }) {
  const theme = useContext(ThemeContext).currentTheme;
  const styles = StyleSheet.create({
    notemenubar: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: colors[theme].secondary,
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
  });
  const realm = useRealm();

  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleBackLongPress = () => {
    console.log("Back Long Press");
  };
  const handleSaveLongPress = () => {
    console.log("Save Long Press");
  };

  return (
    <View style={styles.notemenubar}>
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        <IconBtn
          img={
            <BackIcon
              width="70%"
              height="70%"
              fill={colors[theme].iconFill}
              style={{ marginLeft: -15 }}
            />
          }
          onBtnPress={handleBackPress}
          onBtnLongPress={handleBackLongPress}
        />
      </View>
      <IconBtn
        img={<SaveIcon width="80%" height="80%" fill={colors[theme].iconFill} />}
        onBtnPress={handleSavePress}
        onBtnLongPress={handleSaveLongPress}
      />
    </View>
  );
}
