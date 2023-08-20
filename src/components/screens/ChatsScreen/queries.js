export const listChatRooms = /* GraphQL */ `
query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      ChatRooms {
        items {
          id
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
  `