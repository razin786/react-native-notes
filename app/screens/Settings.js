import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import colors from "../config/colors";
import IconBtn from "../components/IconBtn";
import BackIcon from "../assets/icons/Back.svg";
import { Switch } from "react-native-gesture-handler";
import { useState } from "react";
import { mmkvStorage } from "../config/MMKVConfig";
import { ThemeContext } from "../ThemeProvider";

export default function Settings({ navigation }) {
  theme = useContext(ThemeContext).currentTheme;
  setTheme = useContext(ThemeContext).changeTheme;
  const [switchState, setSwitchState] = useState(
    theme == "dark" ? true : false
  );

  const styles = StyleSheet.create({
    topbar: {
      flex: 2,
      flexDirection: "row",
      backgroundColor: colors[theme].secondary,
      justifyContent: "flex-start",
      alignItems: "flex-end",
    },
    settingscontainer: {
      flex: 32,
      backgroundColor: colors[theme].primary,
      paddingTop: 50,
    },
    settingbar: {
      height: "10%",
      flexDirection: "row",
      backgroundColor: colors[theme].tertiary,

      alignItems: "center",
      paddingLeft: 25,
    },
    text: {
      color: colors[theme].textPrimary,
      fontSize: 27,
    },
  });
  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleBackLongPress = () => {
    console.log("Back Long Press");
  };
  const handleSwitchPress = () => {
    setSwitchState(!switchState);
    if (theme == "light") {
      mmkvStorage.set("theme", "dark");
      setTheme("dark");
    } else {
      mmkvStorage.set("theme", "light");
      setTheme("light");
    }
  };

  return (
    <>
      <View style={styles.topbar}>
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
      <View style={styles.settingscontainer}>
        <View style={styles.settingbar}>
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>Dark Mode</Text>
          </View>
          <Switch value={switchState} onValueChange={handleSwitchPress} />
        </View>
      </View>
    </>
  );
}
