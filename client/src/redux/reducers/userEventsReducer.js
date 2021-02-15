import { GET_DB_USER_EVENTS, OUT_USER_EVENTS, SET_NEW_EVENT } from "../types/userEvents";

const userEventsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_DB_USER_EVENTS:
      return action.payload
    case SET_NEW_EVENT:
      return [...state, action.payload]
    case OUT_USER_EVENTS:
      return []
    default:
      return state
  }
}

export default userEventsReducer;
