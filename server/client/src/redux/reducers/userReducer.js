import { GET_USER, LOGOUT_USER, UPDATE_USER_DATA } from "../types/user"

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return action.payload
    case LOGOUT_USER:
      return action.payload
    case UPDATE_USER_DATA:
      const { name, phone, information: info, _id: id, fav_games } = action.payload
      // console.log(id)
      console.log(fav_games);
      console.log(state.fav_games);
      return {
        name,
        phone,
        info,
        id, 
        fav_games
      }
    default:
      return state
  }
}


export default userReducer
