import * as types from "./auth.types"
import { cookies } from "../../utils/cookies"

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
		case types.FETCH_sUCCESS_AUTH:
			return {
				...state,
				user: action.payload.user,
				session_id: action.payload.session_id
			};
		case types.LOGOUT:
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