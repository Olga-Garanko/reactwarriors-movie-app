import React from "react";
import Sort from "../Filters/Sort";
import ReleaseYear from "../Filters/ReleaseYear";
import Genres from "../Filters/Genres";
import Pagination from "../Filters/Pagination";
import PropTypes from "prop-types";

export default class Filters extends React.Component {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired,
    total_pages: PropTypes.number.isRequired
  };

  render() {
    const {
      filters: { sort_by, primary_release_year, with_genres },
      page,
      total_pages,
      onChangeFilters,
      onChangeGenre,
      onChangePage,
      onClearFilters
    } = this.props;
    return (
      <form className="mb-3">

        <Sort sort_by={sort_by} onChangeSortBy={onChangeFilters} />

        <ReleaseYear primary_release_year={primary_release_year} onChangeYear={onChangeFilters} />

        <Genres with_genres={with_genres} onChangeGenre={onChangeGenre} />

        <Pagination page={page} total_pages={total_pages} onChangePage={onChangePage} />

        <div className="form-group">
          <button
            type="button"
            className="btn btn-light"
            onClick={onClearFilters}
          >
            Очистить
          </button>

        </div>  
      </form>
    );
  }
}
