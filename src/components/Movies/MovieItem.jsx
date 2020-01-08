import React from "react";
import MovieFavorite from "./MovieFavorite";
import MovieWatchlist from "./MovieWatchlist";

class MovieItem extends React.Component {
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
            <MovieFavorite id={item.id} favorites={favorites} />
            <MovieWatchlist id={item.id} watchlist={watchlist} />
        </div>
      </div>
    )
  }
}

export default MovieItem;

