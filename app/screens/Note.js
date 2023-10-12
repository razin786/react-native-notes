import { useContext, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import colors from "../config/colors";
import NoteMenuBar from "../components/NoteMenuBar";
import { useRealm } from "../config/RealmSetup";
import { ThemeContext } from "../ThemeProvider";

export default function Note({ route, navigation }) {
  const theme = useContext(ThemeContext).currentTheme;
  const styles = StyleSheet.create({
    noteview: {
      flex: 32,
      backgroundColor: colors[theme].primary,
      paddingLeft: 10,
      paddingRight: 5,
    },
    title: {
      height: "8%",
      color: colors[theme].textPrimary,
      fontSize: 40,
    },
    note: {
      flex: 1,
      textAlignVertical: "top",
      color: colors[theme].textPrimary,
      fontSize: 25,
    },
    notemenubar_container: {
      flex: 2,
    },
  });
  const realm = useRealm();
  const [text, setText] = useState(route.params.text || "");
  const [title, setTitle] = useState(route.params.title || "");
  const noteid = route.params.noteid;

  return (
    <>
      <View style={styles.notemenubar_container}>
        <NoteMenuBar
          id={noteid}
          navigation={navigation}
          text={text}
          title={title}
        />
      </View>
      <View style={styles.noteview}>
        <TextInput
          style={styles.title}
          onChangeText={setTitle}
          value={title}
          placeholder="Title"
          placeholderTextColor={"gray"}
        />
        <TextInput
          style={styles.note}
          onChangeText={setText}
          placeholder="Note"
          placeholderTextColor={"gray"}
          value={text}
          multiline
        />
      </View>
    </>
  );
}
