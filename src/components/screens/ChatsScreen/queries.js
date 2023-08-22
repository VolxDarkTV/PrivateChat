export const listChatRooms = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      ChatRooms {
        items {
          id
          _deleted
          chatRoom {
            id
            users {
              items {
                id
                user {
                  id
                  image
                  name
                }
              }
            }
            LastMessage {
              id
              text
              createdAt
            }
          }
        }
      }
    }
  }
`;

export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom($id: ID!) {
    deleteChatRoom(input: { id: $id }) {
      id
    }
  }
`;
