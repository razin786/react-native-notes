import { View, Text, StyleSheet } from "react-native";
import colors from "../config/colors";
import IconBtn from "./IconBtn";
import BackIcon from "../assets/icons/Back.svg";
import DeleteIcon from "../assets/icons/Delete.svg";
import { useRealm, useQuery } from "../config/RealmSetup";
import { useContext } from "react";
import { ThemeContext } from "../ThemeProvider";

export default function DeleteMenuBar({
  setDeleteMode,
  setDeleteSet,
  deleteSet,
}) {
  const theme = useContext(ThemeContext).currentTheme;
  const styles = StyleSheet.create({
    deletemenubar: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: colors[theme].secondary,
      justifyContent: "center",
      alignItems: "flex-end",
    },
  });

  const realm = useRealm();
  const notesToDel = useQuery("RealmNote").filtered(
    "_id IN $0",
    Array.from(deleteSet)
  );

  const handleBackPress = () => {
    setDeleteMode(false);
    setDeleteSet(new Set());
  };
  const handleBackLongPress = () => {
    console.log("Back Long Press");
  };
  const handleDeletePress = () => {
    realm.write(() => {
      realm.delete(notesToDel);
    });
    setDeleteMode(false);
    setDeleteSet(new Set());
  };
  const handleDeleteLongPress = () => {
    console.log("Delete Long Press");
  };
  return (
    <View style={styles.deletemenubar}>
      <IconBtn
        img={<BackIcon width="70%" height="70%" fill={colors[theme].iconFill} />}
        onBtnPress={handleBackPress}
        onBtnLongPress={handleBackLongPress}
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
        img={<DeleteIcon width="80%" height="80%" fill={colors[theme].iconFill} />}
        onBtnPress={handleDeletePress}
        onBtnLongPress={handleDeleteLongPress}
      />
    </View>
  );
}
