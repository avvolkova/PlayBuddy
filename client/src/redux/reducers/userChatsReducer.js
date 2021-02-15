import { ADD_MESSAGE, GET_DB_USER_CHATS, OUT_USER_CHATS, SET_NEW_CHAT } from "../types/userChats";

const userChatsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_DB_USER_CHATS:
      return action.payload
    case SET_NEW_CHAT:
      return [...state, action.payload];
    case OUT_USER_CHATS:
      return [];
    case ADD_MESSAGE:
      return state.map(chat => chat._id === action.payload.chatId
        ?
        { ...chat, messages: [...chat.messages, action.payload.newMess] }
        :
        chat);
    default:
      return state
  }
}

export default userChatsReducer;
