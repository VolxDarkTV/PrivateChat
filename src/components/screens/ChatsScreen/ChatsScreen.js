import { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
// import chats from "../../../../assets/data/chats.json";
import ChatListItem from "../../ChatListItem";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listChatRooms, deleteChatRoom } from "./queries";

const ChatsScreen = () => {
  const [chatRoom, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const autUser = await Auth.currentAuthenticatedUser();

      const response = await API.graphql(
        graphqlOperation(listChatRooms, { id: autUser.attributes.sub })
      );

      // Filtra le chatRoom con _deleted impostato su false
      const filteredChatRooms = response.data.getUser.ChatRooms.items.filter(
        (chatRoom) => chatRoom._deleted !== true
      );

      setChatRooms(filteredChatRooms);
      // console.log(filteredChatRooms);
    };

    fetchChatRooms();
  }, []);

  //DELETE
  const deleteMarkedChatRooms = async () => {
    const chatRoomsToDelete = chatRoom.filter((room) => room._deleted === true);

    for (const room of chatRoomsToDelete) {
      await API.graphql(
        graphqlOperation(deleteChatRoom, { input: { id: room.id } })
      );
    }

    // Refresh the chatRooms list after deletion
    setChatRooms(chatRoom.filter((room) => room._deleted !== true));
  };

  return (
    <View>
      <FlatList
        data={chatRoom}
        renderItem={({ item }) => <ChatListItem chat={item.chatRoom} />}
        style={{ backgroundColor: "white" }}
      />
      <Button
        title="Delete Marked Chat Rooms"
        onPress={deleteMarkedChatRooms}
      />
    </View>
  );
};

export default ChatsScreen;
