import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Linking,
  Button,
} from "react-native";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createChatRoom, createUserChatRoom } from "../../graphql/mutations";
import { useNavigation } from "@react-navigation/native";
import { getCommonChatRoomWithUser } from "../../services/chatRoomService";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ContactListItem = ({ user }) => {
  const navigation = useNavigation();

  const onPress = async () => {
    console.warn("pressed");
    //Chech if we have a chat with that user
    const existingChatRoom = await getCommonChatRoomWithUser(user.id);
    if(existingChatRoom){
      navigation.navigate("Chat", { id: existingChatRoom.chatRoom.id });
      // console.log(existingChatRoom.chatRoom.id);

      return;
    }

    //Create a new ChatRoom
    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, { input: {} })
    );
    console.log(newChatRoomData);
    if (!newChatRoomData?.data?.createChatRoom) {
      console.log("error chatRoom exist");
    }
    const newChatRoom = newChatRoomData?.data?.createChatRoom;

    //Add the clicked user to the ChatRoom
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: { chatRoomId: newChatRoom.id, userId: user.id },
      })
    );

    //Add the auth user to the ChatRoom
    const authUser = await Auth.currentAuthenticatedUser();
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: { chatRoomId: newChatRoom.id, userId: authUser.attributes.sub },
      })
    );

    //navigate to the newly created ChatRoom
    navigation.navigate("Chat", { id: newChatRoom.id });
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image style={styles.image} source={{ uri: user.image }} />

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.name}>
          {user.name}
        </Text>
        <Text numberOfLines={2} style={styles.subTitle}>
          {user.status}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 5,
    alignItems: "center",

    height: 70,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
  },
  subTitle: {
    color: "gray",
  },
});

export default ContactListItem;
