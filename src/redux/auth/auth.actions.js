import * as types from "./auth.types"
import CallApi from "../../api/api";

export const fetchAuth = session_id => dispatch => {
  dispatch({
    type: types.FETCH_REQUEST_AUTH
  });
  CallApi.get("/account", {
    params: {
      session_id
    }
  })
  .then(user => {
    console.log(user);
    dispatch(updateAuth({ user, session_id }));
    dispatch(fetchFavoriteMovies({ user, session_id }));
    dispatch(fetchRatedMovies({ user, session_id }));
    dispatch(fetchWatchlistMovies({ user, session_id }));
  })
  .catch(error => {
    dispatch({
      type: types.FETCH_ERROR_AUTH,
      payload: error
    });
  });
};

export const updateAuth = ({ user, session_id }) => ({
	type: types.UPDATE_AUTH,
	payload: {
    user,
    session_id
  }
});

export const onLogOut = () => {
	return {
		type: types.LOGOUT
	};
};

export const toggleLoginModal = () => {
	return {
		type: types.TOGGLE_LOGIN_MODAL
	};
};

export const fetchFavoriteMovies = ({ user, session_id }) => dispatch => {
    return CallApi.get(`/account/${user.id}/favorite/movies`, {
      params: {
        session_id
      }
    })
    .then(favorite => {
      dispatch(updateFavoriteMovies(favorite.results));
    });
};

export const updateFavoriteMovies = movies => {
  return {
    type: types.UPDATE_FAVORITE_MOVIES,
    payload: movies
  };
};

export const fetchRatedMovies = ({ user, session_id }) => dispatch => {
    return CallApi.get(`/account/${user.id}/rated/movies`, {
      params: {
        session_id
      }
    })
    .then(rated => {
      dispatch(updateRatedMovies(rated.results));
    });
};

export const updateRatedMovies = movies => {
  return {
    type: types.UPDATE_RATED_MOVIES,
    payload: movies
  };
};

export const fetchWatchlistMovies = ({ user, session_id }) => dispatch => {
    return CallApi.get(`/account/${user.id}/watchlist/movies`, {
      params: {
        session_id
      }
    })
    .then(watchlist => {
      dispatch(updateWatchlistMovies(watchlist.results));
    });
};

export const updateWatchlistMovies = movies => {
  return {
    type: types.UPDATE_WATCHLIST_MOVIES,
    payload: movies
  };
};