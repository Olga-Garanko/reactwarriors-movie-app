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
		case "UPDATE_AUTH":
			cookies.set("session_id", action.payload.session_id, {
				path: "/",
				maxAge: 2592000
			});
			return {
				...state,
				user: action.payload.user,
				session_id: action.payload.session_id
			};
		case "LOGOUT":
			cookies.remove("session_id");
			return {
				...state,
				user: null,
				session_id: null
			}
		case "TOGGLE_LOGIN_MODAL":
			return {
				...state,
				showLoginModal: !state.showLoginModal
			}
		case "UPDATE_FAVOURITE_MOVIES":
			return {
				...state,
				favorite: action.payload
			}
		case "UPDATE_WATCHLIST_MOVIES":
			return {
				...state,
				watchlist: action.payload
			}
		case "UPDATE_RATED_MOVIES":
			return {
				...state,
				rated: action.payload
			}
		default:
			return state;	
	}
};

export default authReducer;