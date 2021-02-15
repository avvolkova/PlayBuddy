import { GET_ALL_GAMES, GET_FAV_GAMES } from "../types/games";

const initGameState = {
  favGames: [],
  games: [],
};

const gamesReducer = (state = initGameState, action) => {
  switch (action.type) {
    case GET_ALL_GAMES:
      return { ...state, games: action.payload };
    case GET_FAV_GAMES:
      return { ...state, favGames: action.payload };
    default:
      return state;
  }
};

export default gamesReducer;
