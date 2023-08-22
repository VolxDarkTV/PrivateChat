import { useState, useEffect } from "react";
import { View, Text, FlatList, Button } from "react-native";
import ContactListItem from "../ContactListItem";
import { API, graphqlOperation } from "aws-amplify";
import { listUsers } from "../../graphql/queries";
import { deleteUser } from "../../graphql/mutations";

const ContactsScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await API.graphql(graphqlOperation(listUsers));
      const userList = response.data.listUsers.items;
      const filteredUsers = userList.filter(user => user._deleted !== true);
      setUsers(filteredUsers);
      // console.log(filteredUsers.length);
    };
    fetchUsers();
  }, []);

  
  const deleteMarkedUsers = async () => {
    for (const user of users) {
      if (user._deleted === true) {
        await API.graphql(graphqlOperation(deleteUser, { input: { id: user.id } }));
      }
    }
    setUsers(users.filter((user) => user._deleted !== true));
  };

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => <ContactListItem user={item} />}
        style={{ backgroundColor: "white" }}
      />
      <Button
        title="Delete Marked Users"
        onPress={deleteMarkedUsers}
      />
    </View>
  );
};

export default ContactsScreen;
