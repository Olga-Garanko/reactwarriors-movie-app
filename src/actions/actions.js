export const updateAuth = payload => {
	return {
		type: "UPDATE_AUTH",
		payload
	};
};

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