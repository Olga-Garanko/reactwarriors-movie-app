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
    };
  }
  onClick(id) {
    const session_id = cookies.get("session_id");
    if (session_id) {
      CallApi.get("/account/favorite", {
        params: {
          session_id: session_id
        },
        body: {
          media_type: 'movie',
          media_id: this.props.item.id,
          favorite: !this.props.favorites
        }
      })
      .then(user => {
        console.log('user', user)
      })
    }
  }

  render() {
    const { item, favorites, watchlist } = this.props;
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
          { favorites ? <StarIcon onClick={this.onClick(item.id)} /> : <StarBorderIcon onclick={this.onClick(item.id)} /> }
          { watchlist ? <BookmarkIcon onClick={this.onClick(item.id)} /> : <BookmarkBorderIcon onclick={this.onClick(item.id)} /> }
        </div>
      </div>
    )
  }
}
