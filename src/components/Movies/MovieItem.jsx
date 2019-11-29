import React from "react";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CallApi from "../../api/api";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default class MovieItem extends React.Component {
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
    const session_id = cookies.get("session_id");
    console.log('changeFavorite')
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
    }
  }

  changeWatchlist = () => {
    const session_id = cookies.get("session_id");
    console.log('changeWatchlist')
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
    }
  }

  render() {
    const { item } = this.props;
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
          { favorites ? <StarIcon onClick={this.changeFavorite} /> : <StarBorderIcon onClick={this.changeFavorite} /> }
          { watchlist ? <BookmarkIcon onClick={this.changeWatchlist} /> : <BookmarkBorderIcon onClick={this.changeWatchlist} /> }
        </div>
      </div>
    )
  }
}
