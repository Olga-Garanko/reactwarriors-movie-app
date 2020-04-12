import React from "react";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import Header from "./Header/Header";
import CallApi from "../api/api";
import {actionCreatorUpdateAuth} from "../"

import Cookies from "universal-cookie";

import { BrowserRouter, Route } from "react-router-dom";

const cookies = new Cookies();

export const AppContext = React.createContext();
export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
/*      user: null,
      session_id: cookies.get("session_id"),*/
      rated: [],
      watchlist: [],
      favorite: [],
      showModal: false,
    };
  }

  updateAuth = (user, session_id) => {
    this.props.store.dispatch(
      actionCreatorUpdateAuth({
        user,
        session_id
      })
    )
/*    this.setState({
      user,
      session_id
    });    
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });*/
  };

  onLogOut = () => {
    cookies.remove("session_id");
    this.setState({
      session_id: null,
      user: null,
      rated: [],
      watchlist: [],
      favorite: [],
    });
  };

  getRated = ({user, session_id}) => {
    CallApi.get(`/account/${user.id}/rated/movies`, {
      params: {
        session_id
      }
    })
    .then(rated => {
      this.setState({
        rated: rated.results
      });
    });
  }

  getWatchlist = ({user, session_id}) => {
    CallApi.get(`/account/${user.id}/watchlist/movies`, {
      params: {
        session_id
      }
    })
    .then(watchlist => {
      this.setState({
        watchlist: watchlist.results
      });
    });
  }

  getFavorite = ({user, session_id}) => {
    CallApi.get(`/account/${user.id}/favorite/movies`, {
      params: {
        session_id
      }
    })
        .then(favorite => {
          this.setState({
            favorite: favorite.results
          });
        });
  }

  componentDidMount() {
    this.props.store.subscribe(() => {
      console.log("change", this.props.store.getState());
      this.forceUpdate();
    })
/*    const session_id = cookies.get("session_id");
    if (session_id) {
      CallApi.get("/account", {
        params: {
          session_id: session_id
        }
      })
      .then(user => {
        this.updateAuth(user, session_id);
        this.getRated({user, session_id});
        this.getWatchlist({user, session_id});
        this.getFavorite({user, session_id});
      });

    }*/
  }

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  };

  render() {
    const { user, session_id } = this.props.store.getState();
    const { rated, favorite, watchlist, showModal } = this.state;
    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user,
            session_id,            
            updateAuth: this.updateAuth,
            onLogOut: this.onLogOut,
            showModal,
            toggleModal: this.toggleModal,
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
