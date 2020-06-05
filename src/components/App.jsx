import React from "react";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import Header from "./Header/Header";
import CallApi from "../api/api";
import { BrowserRouter, Route } from "react-router-dom";
import { withAuth } from '../hoc/withAuth';

class App extends React.Component {

  componentDidMount() {
	const { auth, authActions } = this.props;
	if (auth.session_id) {
		authActions.fetchAuth(auth.session_id)
	}
  }

	getRated = ({user, session_id}) => {
		CallApi.get(`/account/${user.id}/rated/movies`, {
			params: {
				session_id
			}
		})
		.then(rated => {
			this.props.updateRatedMovies(rated.results);
		});
	}

	getWatchlist = ({user, session_id}) => {
		CallApi.get(`/account/${user.id}/watchlist/movies`, {
			params: {
				session_id
			}
		})
		.then(watchlist => {
			this.props.updateWatchlistMovies(watchlist.results);
		});
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