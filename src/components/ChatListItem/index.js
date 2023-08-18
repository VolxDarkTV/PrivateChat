import {StyleSheet, View, Text, Image } from 'react-native';

const ChatListItem = () => {
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: 'https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg'}} />

            <View style={styles.content}>
                <View style={styles.row}>
                    <Text numberOfLines={1} style={styles.name}>Vincenzo</Text>
                    <Text style={styles.subTitle}>20:00</Text>
                </View>

                <Text numberOfLines={2} style={styles.subTitle}>Ciao!Ciao!Ciao!Ciao!Ciao!Ciao!Ciao!CiCiao!Ciao!Ciao!Ciao!Ciao!Ciao!Ciao!Ciao!ao!Ciao!Ciao!Ciao!Ciao!Ciao!Ciao!Ciao!Ciao!Ciao!Ciao!Ciao!Ciao!Ciao!Ciao!Ciao!Ciao!</Text>
            </View>

        </View>
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