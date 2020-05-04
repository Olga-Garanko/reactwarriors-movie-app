import React from "react";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import Header from "./Header/Header";
import CallApi from "../api/api";
import { updateAuth, onLogOut, toggleLoginModal, updateFavoriteMovies, updateRatedMovies, updateWatchlistMovies } from "../redux/auth/auth.actions";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';

export const AppContext = React.createContext();

class App extends React.Component {

  componentDidMount() {
	const { session_id } = this.props;
	if (session_id) {
	  CallApi.get("/account", {
		params: {
		  session_id
		}
	  })
	  .then(user => {
	  	console.log(user);
		this.props.updateAuth(user, session_id);
		this.getRated({ user, session_id });
		this.getWatchlist({ user, session_id });
		this.getFavorite({ user, session_id });
	  });
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

	getFavorite = ({user, session_id}) => {
		CallApi.get(`/account/${user.id}/favorite/movies`, {
			params: {
				session_id
			}
		})
		.then(favorite => {
			this.props.updateFavoriteMovies(favorite.results);
		});
	}

  render() {
	const { 
			user,
			session_id,
			updateAuth,
			onLogOut,
			showLoginModal,
			toggleLoginModal,            
			rated,
			favorite,
			watchlist
		  } = this.props;
	return (
	  <BrowserRouter>
		<AppContext.Provider
		  value={{
			user,
			session_id,            
			updateAuth,
			onLogOut,
			showLoginModal,
			toggleLoginModal,
			favorite,
			watchlist,
			rated,
			getRated: this.getRated,
			getWatchlist: this.getWatchlist,
			getFavorite: this.getFavorite

		  }}
		>
		<div>
		  <Header />
		  <Route exact path="/" component={MoviesPage} />
		  <Route path="/movie/:id" component={MoviePage} />
		</div>
	  </AppContext.Provider>
	</BrowserRouter>
	);
  }
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		session_id: state.auth.session_id,
		showLoginModal: state.auth.showLoginModal,
		rated: state.auth.rated,
		watchlist: state.auth.watchlist,
		favorite: state.auth.favorite
  }
}

const mapDispatchToProps = {
	updateAuth,
	onLogOut,
	toggleLoginModal,
	updateFavoriteMovies,
	updateRatedMovies,
	updateWatchlistMovies
};

export default connect(mapStateToProps, mapDispatchToProps)(App)