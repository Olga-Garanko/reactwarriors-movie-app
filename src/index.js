import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/index.css";
import store from "./store/store";

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
