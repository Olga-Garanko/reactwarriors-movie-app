import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import { cookies } from "../utils/cookies";
import { FETCH_sUCCESS_AUTH, LOGOUT } from "../redux/auth/auth.types"

const updateCookies = ({ dispatch, getState}) => next => action => {
	if (action.type === FETCH_sUCCESS_AUTH)
	cookies.set("session_id", action.payload.session_id, {
		path: "/",
		maxAge: 2592000
	});
	if (action.type === LOGOUT)
	cookies.remove("session_id");
	return next(action);
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, updateCookies))
);

export default store;