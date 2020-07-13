import React from "react";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import Header from "./Header/Header";
import { BrowserRouter, Route } from "react-router-dom";
import { withAuth } from '../hoc/withAuth';

class App extends React.Component {

  componentDidMount() {
	const { auth, authActions } = this.props;
	if (auth.session_id) {
		authActions.fetchAuth(auth.session_id)
	}
  }

  render() {
	return (
		<BrowserRouter>
			<div>
			  <Header />
			  <Route exact path="/" component={MoviesPage} />
			  <Route path="/movie/:id" component={MoviePage} />
			</div>
		</BrowserRouter>
	);
  }
}

export default withAuth(App);