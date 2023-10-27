import { useContext, useState, useRef } from "react";
import { View, TextInput, StyleSheet, KeyboardAvoidingView } from "react-native";
import colors from "../config/colors";
import NoteMenuBar from "../components/NoteMenuBar";
import { ThemeContext } from "../ThemeProvider";
import { WebView } from "react-native-webview";
import { useRealm } from "../config/RealmSetup";
import combinedHtml from "../helpers/TextEditorHTML";


export default function Note({ route, navigation }) {
  const theme = useContext(ThemeContext).currentTheme;
  const webViewRef = useRef();
  const realm = useRealm();

  const [title, setTitle] = useState(route.params.title || "");
  const noteid = route.params.noteid;
  const body = route.params.body;
  const loadBody = body ? `quill.setContents(${body});` : "";

  const styles = StyleSheet.create({
    noteview: {
      flex: 32,
      backgroundColor: colors[theme].primary,
    },
    title: {
      height: "8%",
      color: colors[theme].textPrimary,
      fontSize: 40,
      paddingLeft: 10,
      paddingRight: 5,
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

  const handleSavePress = () => {
    webViewRef.current.injectJavaScript("saveRequest()");
  };

  const saveNote = (event) => {
    let body = event.nativeEvent.data;
    realm.write(() => {
      realm.create(
        "RealmNote",
        { _id: noteid, title: title.trim(), body: body },
        "modified"
      );
    });
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.notemenubar_container}>
        <NoteMenuBar
          navigation={navigation}
          handleSavePress={handleSavePress}
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
        <KeyboardAvoidingView
    behavior="padding"
    keyboardVerticalOffset={100}
    enabled
    style={{ flexGrow: 1 }}>
          <WebView
            injectedJavaScript={loadBody}
            onMessage={saveNote}
            ref={webViewRef}
            source={{ html: combinedHtml(theme) }}
          />
        </KeyboardAvoidingView>
      </View>
    </>
  );
}
