import { View, Text, ImageBackground, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Message from '../Message';
import InputBox from '../InputBox';
import messages from '../../../assets/data/messages.json';
import bg from '../../../assets/images/BG.png';

const ChatScreen = () => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.bg}>
        <ImageBackground source={bg} style={styles.bg}>
            <FlatList 
                data={messages} 
                renderItem={({item}) => <Message message={item}/>}
                style={styles.list}
                inverted
            />
            <InputBox/>
        </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    bg: {
        flex: 1,
    },
    list:{
        padding: 10,
    }
});
export default ChatScreen