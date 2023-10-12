import { View, StyleSheet, FlatList } from "react-native";
import colors from "../config/colors";
import NoteBox from "../components/NoteBox";
import HomeMenuBar from "../components/HomeMenuBar";
import DeleteMenuBar from "../components/DeleteMenuBar";
import { useState } from "react";
import Realm from "realm";
import { useRealm, useQuery } from "../config/RealmSetup";
import { useContext } from "react";
import { ThemeContext } from "../ThemeProvider";

export default function Home({ navigation }) {
  const theme = useContext(ThemeContext).currentTheme;
  const styles = StyleSheet.create({
    container: {
      flex: 32,
      backgroundColor: colors[theme].primary,
      alignItems: "center",
      justifyContent: "center",
    },
    homemenubar_container: {
      flex: 2,
    },
    flatlist: {
      alignItems: "center",
    },
  });
  const realm = useRealm();
  const [deleteMode, setDeleteMode] = useState(false);
  const [deleteSet, setDeleteSet] = useState(new Set());

  const handleSettingsPress = () => {
    navigation.navigate("Settings");
  };
  const handleAddPress = () => {
    const noteid = new Realm.BSON.ObjectID().toString();
    navigation.navigate("Note", { noteid: noteid });
  };
  const handleSettingsLongPress = () => {
    console.log("settings long press");
  };
  const handleAddLongPress = () => {
    console.log("add long press");
  };
  const notes = useQuery("RealmNote");

  return (
    <>
      <View style={styles.homemenubar_container}>
        {deleteMode ? (
          <DeleteMenuBar
            deleteSet={deleteSet}
            setDeleteMode={setDeleteMode}
            setDeleteSet={setDeleteSet}
          />
        ) : (
          <HomeMenuBar
            handleAddLongPress={handleAddLongPress}
            handleAddPress={handleAddPress}
            handleSettingsLongPress={handleSettingsLongPress}
            handleSettingsPress={handleSettingsPress}
          />
        )}
      </View>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.flatlist}
          data={notes}
          decelerationRate={0.95}
          keyExtractor={(item, index) => item.title + index.toString()}
          overScrollMode="never"
          renderItem={({ item }) => (
            <NoteBox
              deleteSet={deleteSet}
              deleteMode={deleteMode}
              navigation={navigation}
              noteid={item._id}
              setDeleteSet={setDeleteSet}
              setDeleteMode={setDeleteMode}
              text={item.text}
              title={item.title}
            />
          )}
          style={{ width: "100%" }}
        ></FlatList>
      </View>
    </>
  );
}
