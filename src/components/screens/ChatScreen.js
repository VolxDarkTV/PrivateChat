import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  Button,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Message from "../Message";
import InputBox from "../InputBox";

import bg from "../../../assets/images/BG.png";
import { API, graphqlOperation } from "aws-amplify";
import { getChatRoom } from "../../graphql/queries";
import { deleteMessage } from "../../graphql/mutations";
import { onCreateMessage } from "../../graphql/subscriptions";

const ChatScreen = () => {
  const [chatRoom, setChatRoom] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();
  const chatroomID = route.params.id;

  useEffect(() => {
    API.graphql(graphqlOperation(getChatRoom, { id: chatroomID })).then(
      (result) => setChatRoom(result?.data?.getChatRoom)
    );

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
      subscription.unsubscribe();
    };
  }, [chatroomID]);

  const sortedMessages = chatRoom?.Messages.items
    .filter((message) => message._deleted !== true) // Filtra i messaggi eliminati
    .slice()
    .sort((b, a) =>
    a.createdAt.localeCompare(b.createdAt)
  );

  // const filteredMessage = sor
  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [route.params.name]);

  if (!chatRoom) {
    return <ActivityIndicator />;
  }

  const openModal = (message) => {
    setSelectedMessage(message);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedMessage(null);
    setIsModalVisible(false);
  };

  const deleteMyMessage = async () => {
    if (selectedMessage) {
      // Effettua l'eliminazione del messaggio tramite una chiamata API
      await API.graphql(
        graphqlOperation(deleteMessage, { input: { id: selectedMessage.id } })
      );
      console.log(selectedMessage.id);
      // Aggiorna lo stato dei messaggi nel modo appropriato
      // Chiudi la modale
      closeModal();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 90}
      style={styles.bg}
    >
      <ImageBackground source={bg} style={styles.bg}>
        <FlatList
          data={sortedMessages}
          renderItem={({ item }) => (
            <TouchableOpacity onLongPress={() => openModal(item)}>
              <Message message={item} />
            </TouchableOpacity>
          )}
          style={styles.list}
          inverted
        />
        <InputBox chatroom={chatRoom} />
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <Text>Eliminare il messaggio?</Text>
            <Button title="Annulla" onPress={closeModal} />
            <Button title="Elimina" onPress={deleteMyMessage} />
          </View>
        </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default ChatScreen;
