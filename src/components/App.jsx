import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import CallApi from "../api/api";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AppContext = React.createContext();
export const LoginContext = React.createContext();
export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      session_id: cookies.get("session_id"),
      favorites: [],
      watchlist: [],
      showModal: false,
      filters: {
        sort_by: "popularity.desc",
        primary_release_year: String(new Date().getFullYear()),
        with_genres: []
      },
      page: 1,
      total_pages: ""
    };
  }

  updateUser = user => {
    this.setState({
      user
    });
  };

  updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.setState({
      session_id
    });
  };

  onLogOut = () => {
    cookies.remove("session_id");
    this.setState({
      session_id: null,
      user: null,
      favorites: [],
      watchlist: [],
    });
  };

  onChangeFilters = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value
      }
    }));
  };

  onChangePagination = ({ page, total_pages = this.state.total_pages }) => {
    this.setState({
      page,
      total_pages
    });
  };

  componentDidMount() {
    const session_id = cookies.get("session_id");
    if (session_id) {
      CallApi.get("/account", {
        params: {
          session_id: session_id
        }
      })
      .then(user => {
        this.updateUser(user);
        return user
      })
      .then(user => {
        console.log('user 2', user);
        CallApi.get(`/account/${session_id}/favorite/movies`, {
          params: {
            session_id: session_id
          }
        })
        .then(favorites => {
          this.setState({
            favorites: favorites.results
          });
        })
        return user
      })
      .then(user => {
        CallApi.get(`/account/${session_id}/watchlist/movies`, {
          params: {
            session_id: session_id
          }
        })
        .then(watchlist => {
          this.setState({
            watchlist: watchlist.results
          });
        })
      })
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  };

  render() {
    const { filters, page, total_pages, user, session_id, favorites, watchlist, showModal } = this.state;
    return (
      <AppContext.Provider
        value={{
          user: user,
          updateUser: this.updateUser,
          session_id: session_id,
          updateSessionId: this.updateSessionId,
          onLogOut: this.onLogOut
        }}
      >
      <LoginContext.Provider
        value={{
          showModal: showModal,
          toggleModal: this.toggleModal
        }}
      >
      <div>
        <Header />
        <div className="container">
          <div className="row mt-4">
            <div className="col-4">
              <div className="card w-100">
                <div className="card-body">
                  <h3>Фильтры:</h3>
                  <Filters
                    page={page}
                    total_pages={total_pages}
                    filters={filters}
                    onChangeFilters={this.onChangeFilters}
                    onChangePagination={this.onChangePagination}
                  />
                </div>
              </div>
            </div>
            <div className="col-8">

                <MoviesList
                  filters={filters}
                  page={page}
                  onChangePagination={this.onChangePagination}
                  favorites={favorites.map(item => item.id)}
                  watchlist={watchlist.map(item => item.id)}
                />

            </div>
          </div>
        </div>
      </div>
      </LoginContext.Provider>
    </AppContext.Provider>
    );
  }
}
