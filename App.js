import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import ChatListItem from './src/components/ChatListItem';
import ChatsScreen from './src/components/screens/ChatsScreen';

// const chat ={
//   id: "1",
//   user:{
//     image: "https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg",
//     name: "Vincenzo",
//   },
//   lastMessage: {
//     text: "ok",
//     createdAt: "8:20",
//   },
// };

export default function App() {
  return (
    <View style={styles.container}>

      {/* <ChatListItem chat={chat} /> */}
      <ChatsScreen/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 50,
  },
});
