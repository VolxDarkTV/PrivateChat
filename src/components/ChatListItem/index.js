import {StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const ChatListItem = ({ chat }) => {
    
    const navigation = useNavigation();

    return(
        <Pressable onPress={ () => navigation.navigate('Chat', { id: chat.id, name: chat.user.name })} style={styles.container}>
            <Image style={styles.image} source={{uri: chat.user.image}} />

            <View style={styles.content}>
                <View style={styles.row}>
                    <Text numberOfLines={1} style={styles.name}>{chat.user.name}</Text>
                    <Text style={styles.subTitle}>{dayjs(chat.lastMessage.createdAt).fromNow(true)}</Text>
                </View>

                <Text numberOfLines={2} style={styles.subTitle}>{chat.lastMessage.text}</Text>
            </View>

        </Pressable>
    );
};

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',   
        marginHorizontal: 20,
        marginVertical: 5,

        height: 70,
    },
    image:{
        width:60,
        height:60,
        borderRadius: 10,
        marginRight: 10,
    },
    content:{
        flex: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'lightgray'
    },
    row:{
        flexDirection: 'row',
        marginBottom: 10,
    },
    name:{
        flex: 1,
        fontWeight: 'bold',
    },
    subTitle:{
        color: 'gray',
    },
})

export default ChatListItem;