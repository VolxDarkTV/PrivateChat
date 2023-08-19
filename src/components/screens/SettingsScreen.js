import { View, Text, Button } from 'react-native';
import { Auth } from 'aws-amplify';

const SettingsScreen = () => {
  return (
    <View>
      <Button onPress={() => Auth.signOut()} title='Sign out'/>
    </View>
  )
}

export default SettingsScreen