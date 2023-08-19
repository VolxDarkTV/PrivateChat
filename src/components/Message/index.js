import { View, Text, StyleSheet } from 'react-native'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);


const Message = ({ message }) => {
    const isMyMessage = () => {
        return message.user.id === 'u1';
    }
  return (
    <View style={[styles.container, {
        backgroundColor: isMyMessage() ? '#44bec7' : 'white',
        alignSelf: isMyMessage() ? 'flex-end' : 'flex-start',
    }]}>
      <Text style={styles.text}>{message.text}</Text>
      <Text style={styles.time}>{dayjs(message.createdAt).format('HH:mm')}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        // backgroundColor: 'white',
        // alignSelf: 'flex-start',
        borderRadius: 5,
        margin: 5,
        padding: 10,
        maxWidth: '80%',

        //Shadows
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,

        elevation: 1,
    },
    time:{
        color: 'gray',
        alignSelf: 'flex-end',
    }
})
export default Message