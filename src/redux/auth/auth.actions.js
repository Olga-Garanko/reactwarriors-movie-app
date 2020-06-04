import CallApi from "../../api/api";

export const fetchAuth = session_id => dispatch => {
  dispatch({
    type: "FETCH_REQUEST_AUTH"
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
  })
  .catch(error => {
    dispatch({
      type: "FETCH_ERROR_AUTH",
      payload: error
    });
  });
};

export const updateAuth = ({ user, session_id }) => ({
	type: "UPDATE_AUTH",
	payload: {
    user,
    session_id
  }
});

export const onLogOut = () => {
	return {
		type: "LOGOUT"
	};
};

export const toggleLoginModal = () => {
	return {
		type: "TOGGLE_LOGIN_MODAL"
	};
};

export const fetchFavoriteMovies = ({ user, session_id }) => dispatch => {
    CallApi.get(`/account/${user.id}/favorite/movies`, {
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
    type: "UPDATE_FAVORITE_MOVIES",
    payload: movies
  };
};

export const updateRatedMovies = movies => {
  return {
    type: "UPDATE_RATED_MOVIES",
    payload: movies
  };
};

export const updateWatchlistMovies = movies => {
  return {
    type: "UPDATE_WATCHLIST_MOVIES",
    payload: movies
  };
};