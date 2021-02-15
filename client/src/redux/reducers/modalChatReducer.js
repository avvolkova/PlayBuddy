import { SET_MODAL_CHAT } from "../types/modalChat";

const modalChatReducer = (state = '', action) => {
  switch (action.type) {
    case SET_MODAL_CHAT:
      return action.payload;
    default:
      return state
  }
}

export default modalChatReducer;
