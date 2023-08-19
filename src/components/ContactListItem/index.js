import {StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const ContactListItem = ({ user }) => {
    
    const navigation = useNavigation();

    return(
        <Pressable onPress={ () => {}} style={styles.container}>
            <Image style={styles.image} source={{uri: user.image}} />

            <Text numberOfLines={1} style={styles.name}>{user.name}</Text>

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
    name:{
        flex: 1,
        fontWeight: 'bold',
    },
})

export default ContactListItem;