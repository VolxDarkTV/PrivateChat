import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./src/navigation";
import { Amplify, Auth, API, graphqlOperation } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import awsconfig from "./src/aws-exports";

import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
  useEffect(() => {
    const syncUser = async () => {
      //get auth user
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      //query with sub id
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: authUser.attributes.sub })
      );

      if (userData.data.getUser) {
        console.log("exist a user");
        return;
      }
      //check if there is an user else create one
      const newUser = {
        id: authUser.attributes.sub,
        name: authUser.attributes.phone_number,
        image:
          "https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg",
        status: "Hey, I'm using PrivateChat",
      };

      const newUserResponse = await API.graphql(
        graphqlOperation(createUser, { input: newUser })
      );
    };

    syncUser();
  }, []);

  return (
    <View style={styles.container}>
      <Navigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    justifyContent: "center",

    // paddingVertical: 50,
  },
});

export default withAuthenticator(App);
