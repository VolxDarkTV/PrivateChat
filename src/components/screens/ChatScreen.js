import { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Message from "../Message";
import InputBox from "../InputBox";

import bg from "../../../assets/images/BG.png";
import { API, graphqlOperation, Auth, Hub } from "aws-amplify"; // Import Hub
import { getChatRoom } from "../../graphql/queries";
import { onCreateMessage } from "../../graphql/subscriptions";

const ChatScreen = () => {
  const [chatRoom, setChatRoom] = useState(null);

  // Utilizzo le rotte
  const route = useRoute();
  const navigation = useNavigation();
  const chatroomID = route.params.id;

  useEffect(() => {
    API.graphql(graphqlOperation(getChatRoom, { id: chatroomID })).then(
      (result) => setChatRoom(result?.data?.getChatRoom)
    );

    // Subscribe to onCreateMessage
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage)
    ).subscribe({
      next: (data) => {
        const newMessage = data.value.data.onCreateMessage;
        setChatRoom((prevChatRoom) => {
          if (prevChatRoom.id !== newMessage.chatroomID) {
            return prevChatRoom;
          }
          return {
            ...prevChatRoom,
            Messages: {
              ...prevChatRoom.Messages,
              items: [...prevChatRoom.Messages.items, newMessage],
            },
          };
        });
      },
    });

    return () => {
      subscription.unsubscribe(); // Unsubscribe when component unmounts
    };
  }, [chatroomID]);

   // Ordina i messaggi in base alla data in ordine crescente
  const sortedMessages = chatRoom?.Messages.items.slice().sort((b, a) =>
    a.createdAt.localeCompare(b.createdAt)
  );

  // Imposto il nome della chat in alto
  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [route.params.name]);

  if (!chatRoom) {
    return <ActivityIndicator />;
  }

// console.log(chatRoom.Messages.items);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 90}
      style={styles.bg}
    >
      <ImageBackground source={bg} style={styles.bg}>
        <FlatList
          data={sortedMessages}
          renderItem={({ item }) => <Message message={item} />}
          style={styles.list}
          inverted
        />
        <InputBox chatroom={chatRoom} />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
});

export default ChatScreen;
