import * as types from "./auth.types"
import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialState = {
	user: null,
	session_id: cookies.get("session_id"),
	showLoginModal: false,
	rated: [],
	watchlist: [],
	favorite: []
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.UPDATE_AUTH:
			cookies.set("session_id", action.payload.session_id, {
				path: "/",
				maxAge: 2592000
			});
			return {
				...state,
				user: action.payload.user,
				session_id: action.payload.session_id
			};
		case types.LOGOUT:
			cookies.remove("session_id");
			return {
				...state,
				user: null,
				session_id: null
			}
		case types.TOGGLE_LOGIN_MODAL:
			return {
				...state,
				showLoginModal: !state.showLoginModal
			}
		case types.UPDATE_FAVORITE_MOVIES:
			return {
				...state,
				favorite: action.payload
			}
		case types.UPDATE_WATCHLIST_MOVIES:
			return {
				...state,
				watchlist: action.payload
			}
		case types.UPDATE_RATED_MOVIES:
			return {
				...state,
				rated: action.payload
			}
		default:
			return state;	
	}
};

export default authReducer;