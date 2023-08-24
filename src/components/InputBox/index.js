import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createMessage, updateChatRoom } from "../../graphql/mutations";

const InputBox = ({ chatroom }) => {
  const [text, setText] = useState("");

  const onSend = async () => {
    const authUser = await Auth.currentAuthenticatedUser();

    const newMessage = {
      chatroomID: chatroom.id,
      text: text,
      userID: authUser.attributes.sub,
    };
    if(newMessage.text.trim() !== ""){
      const newMessageData = await API.graphql(
        graphqlOperation(createMessage, { input: newMessage })
      );
      setText("");
  
      await API.graphql(
        graphqlOperation(updateChatRoom, {
          input: {
            id: chatroom.id,
            chatRoomLastMessageId: newMessageData.data.createMessage.id,
            _version: chatroom._version,
          },
        })
      );
    }

  };

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      {/* Plus */}
      <AntDesign style={styles.plus} name="plus" size={24} color="black" />
      {/* TextInput */}
      <TextInput
        value={text}
        onChangeText={setText}
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
    borderWidth: StyleSheet.hairlineWidth,
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
