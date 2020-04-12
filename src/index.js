import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/index.css";
import { createStore } from "redux";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const actionCreatorUpdateAuth = payload => {
	return {
		type: "UPDATE_AUTH",
		payload
	};
};

const initialState = {
	user: null,
	session_id: cookies.get("session_id"),
	isAuth: false
};

const reducerApp = (state = initialState, action) => {
	switch (action.type) {
		case "UPDATE_AUTH":
			return {
				...state,
				user: action.payload.user,
				session_id: action.payload.session_id,
				isAuth: true
			};
		default:
			return state;	
	}
};

const store = createStore(reducerApp);

store.subscribe(() => {
	console.log("change", store.getState());
})

/*store.dispatch(actionCreatorUpdateAuth({
	user: {
		name: "Olga"
	},
	session_id: "text"
}));

store.dispatch(actionCreatorUpdateAuth({
	user: {
		name: "Olga1"
	},
	session_id: "text1"
}));*/

ReactDOM.render(<App store={store} />, document.getElementById("root"));
