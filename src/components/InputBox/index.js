import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const InputBox = () => {
  const [newMessage, setNewMessage] = useState("");

  const onSend = () => {
    // console.log("test1", newMessage);

    setNewMessage('');
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      {/* Plus */}
      <AntDesign style={styles.plus} name="plus" size={24} color="black" />
      {/* TextInput */}
      <TextInput
        value={newMessage}
        onChangeText={setNewMessage}
        style={styles.input}
        placeholder="Scrivi il tuo messaggio..."
      />
      {/* Send */}
      <MaterialIcons
        onPress={onSend}
        style={styles.send}
        name="send"
        size={18}
        color="black"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "whitesmoke",
    padding: 5,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,

    borderRadius: 50,
    borderColor: "lightgray",
    borderWhidth: StyleSheet.hairlineWidth,
  },
  send: {
    backgroundColor: "royalblue",
    borderRadius: 15,
    overflow: "hidden",
    color: "#fff",
    padding: 5,
  },
  plus: {
    color: "royalblue",
  },
});

export default InputBox;
