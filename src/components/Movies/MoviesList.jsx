import React from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";
import MoviesHOC from "./MoviesHOC"

const MoviesList = ({ movies, favorites, watchlist }) => (
  <div className="row">
    {movies.map(movie => {
      return (
        <div key={movie.id} className="col-6 mb-4">
          <MovieItem item={movie} favorites={favorites.includes(movie.id)} watchlist={watchlist.includes(movie.id)} />
        </div>
      );
    })}
  </div>
);

MoviesList.defaultProps = {
  movies: [],
  favorites: [],
  watchlist: []
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  favorites: PropTypes.array,
  watchlist: PropTypes.array
};

export default MoviesHOC(MoviesList);
