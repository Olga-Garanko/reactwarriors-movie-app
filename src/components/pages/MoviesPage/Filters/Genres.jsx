import React from "react";
import PropTypes from "prop-types";
import GenresHOC from "./GenresHOC";

const Genres = ({ genresList, with_genres, resetGenres, onChangeGenres }) => (
  <React.Fragment>
    <div>
      <button
        type="button"
        className="btn btn-outline-dark mb-2"
        onClick={resetGenres}
      >
        Показать все жанры
      </button>
    </div>
    {genresList.map(genre => (
      <div key={genre.id} className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value={genre.id}
          id={`genre${genre.id}`}
          onChange={onChangeGenres}
          checked={with_genres.includes(String(genre.id))}
        />
        <label className="form-check-label" htmlFor={`genre${genre.id}`}>
          {genre.name}
        </label>
      </div>
    ))}
  </React.Fragment>
);

Genres.defaultProps = {
  genresList: []
};

Genres.propTypes = {
  genresList: PropTypes.array.isRequired
};

export default GenresHOC(Genres);
