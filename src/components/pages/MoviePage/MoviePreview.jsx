import React from "react";
import MovieRated from "../MoviesPage/Movies/MovieRated";
import MovieFavorite from "../MoviesPage/Movies/MovieFavorite";
import MovieWatchlist from "../MoviesPage/Movies/MovieWatchlist";
import MovieImage from "../../UIComponents/MovieImage";

class MoviePreview extends React.Component {

  render() {
    const { movieDetail } = this.props;
    return (
      <div className="row mt-4">
        <div className="col-4">
            <MovieImage
                alt={movieDetail.title}
                src={movieDetail.backdrop_path || movieDetail.poster_path}
                className="my-class"
            />
        </div>
        <div className="col-8">
          <h2>{movieDetail.title}</h2>
          <p className="mt-4">{movieDetail.overview}</p>
          <p>Рейтинг Пользователей: {movieDetail.vote_average}</p>
          <div>
            <div><MovieRated id={movieDetail.id} /> Укажите рейтинг</div>
            <div className="float-right">
                <MovieFavorite id={movieDetail.id} />
                <MovieWatchlist id={movieDetail.id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MoviePreview;
