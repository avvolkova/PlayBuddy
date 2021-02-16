import { GET_CURRENT_EVENT } from "../types/events"

const currentEventReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_EVENT:
      return action.payload
    default:
      return state
  }
}

export default currentEventReducer
