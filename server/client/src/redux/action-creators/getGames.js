import { GET_ALL_GAMES, GET_FAV_GAMES } from "../types/games";

export const getAllGamesThunk = () => {
  return async (dispatch) => {
    const req = await fetch("/event/all-games", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      mode: "cors",
    });
    const res = await req.json();
    if (res) {
      dispatch({
        type: GET_ALL_GAMES,
        payload: res.games,
      });
    }
  };
};

export const getFavGamesThunk = (user) => {
  return async (dispatch) => {
    const res = await fetch("/event/fav-games", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(user),
    });
    const resData = await res.json();
    if (resData) {
      dispatch({
        type: GET_FAV_GAMES,
        payload: resData.favGames,
      });
    }
  };
};
