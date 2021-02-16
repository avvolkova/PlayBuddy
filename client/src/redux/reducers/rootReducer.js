import { combineReducers } from 'redux';
import userChatsReducer from './userChatsReducer';
import userEventsReducer from './userEventsReducer';
import userReducer from './userReducer';
import eventsReducer from "./eventsReducer"
import currentEventReducer from "./currentEventReducer"
import modalChatReducer from './modalChatReducer'
import gamesReducer from './gamesReducer';


const rootReducer = combineReducers({
  user: userReducer,
  userEvents: userEventsReducer,
  userChats: userChatsReducer,
  events: eventsReducer,
  currentEvent: currentEventReducer,
  modalChat: modalChatReducer,
  games: gamesReducer,
})

export default rootReducer;
