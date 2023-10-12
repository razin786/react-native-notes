import { Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import { useContext } from "react";
import { ThemeContext } from "../ThemeProvider";

export default function NoteBox({
  deleteMode,
  deleteSet,
  navigation,
  noteid,
  setDeleteMode,
  setDeleteSet,
  text,
  title,
}) {
  const theme = useContext(ThemeContext).currentTheme;
  const styles = StyleSheet.create({
    notebox: {
      height: 50,
      width: 300,
      marginVertical: 10,
      paddingHorizontal: 5,
      backgroundColor: colors[theme].primary,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      borderColor: colors[theme].borderPrimary,
      borderStyle: "solid",
      borderWidth: 1,
    },
    text: {
      color: colors[theme].textPrimary,
    },
  });

  const handleNoteBoxPress = (noteid) => {
    deleteMode
      ? handleNoteBoxLongPress(noteid)
      : navigation.navigate("Note", {
          noteid: noteid,
          title: title,
          text: text,
        });
  };
  const handleNoteBoxLongPress = (noteid) => {
    setDeleteMode(true);

    const newDeleteSet = new Set(deleteSet);
    newDeleteSet.has(noteid)
      ? newDeleteSet.delete(noteid)
      : newDeleteSet.add(noteid);
    setDeleteSet(newDeleteSet);
  };

  return (
    <TouchableOpacity
      onPress={() => handleNoteBoxPress(noteid)}
      onLongPress={() => handleNoteBoxLongPress(noteid)}
      activeOpacity={0.5}
      style={{
        ...styles.notebox,
        opacity: deleteSet.has(String(noteid)) ? 0.5 : 1,
      }}
    >
      <Text
        style={{ ...styles.text, fontSize: title ? 30 : 20 }}
        numberOfLines={1}
      >
        {title || text}
      </Text>
    </TouchableOpacity>
  );
}
