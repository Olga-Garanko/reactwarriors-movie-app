import React from "react";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CallApi from "../../api/api";
import { AppContext } from "../App";
import { LoginContext } from "../App";

class MovieItem extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: false,
      watchlist: false
    };
  }

  componentDidMount() {
    this.setState({
      favorites: this.props.favorites,
      watchlist: this.props.watchlist
    });
  }

  changeFavorite = () => {
    const { session_id, toggleModal } = this.props;
    if (session_id) {
      CallApi.post(`/account/${session_id}/favorite`, {
        params: {
          session_id: session_id
        },
        body: {
          media_type: 'movie',
          media_id: this.props.item.id,
          favorite: !this.state.favorites
        }
      })
      .then(user => {
        this.setState(state => ({ favorites: !state.favorites }));
      })
    } else toggleModal()
  }

  changeWatchlist = () => {
    const { session_id, toggleModal } = this.props;
    if (session_id) {
      CallApi.post(`/account/${session_id}/watchlist`, {
        params: {
          session_id: session_id
        },
        body: {
          media_type: 'movie',
          media_id: this.props.item.id,
          watchlist: !this.state.watchlist
        }
      })
      .then(user => {
        this.setState(state => ({ watchlist: !state.watchlist }));
      })
    } else toggleModal()
  }

  render() {
    const { item, session_id } = this.props;
    const { favorites, watchlist } = this.state;
    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
            {session_id && favorites ? <StarIcon onClick={this.changeFavorite} /> : <StarBorderIcon onClick={this.changeFavorite} />}
            {session_id && watchlist ? <BookmarkIcon onClick={this.changeWatchlist} /> : <BookmarkBorderIcon onClick={this.changeWatchlist} />}
        </div>
      </div>
    )
  }
}

const MovieItemContainer = props => {
  return (
    <AppContext.Consumer>
      {context => (
        <LoginContext.Consumer>
          {popup => (
            <MovieItem session_id={context.session_id}  toggleModal={popup.toggleModal} {...props} />
          )}
        </LoginContext.Consumer>  
        )
      
      }

    </AppContext.Consumer>
  );
};

MovieItemContainer.displayName = "MovieItemContainer";

export default MovieItemContainer;

