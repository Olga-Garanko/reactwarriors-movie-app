import React from "react";
import Select from "../Common/Select";
import Genres from "../Filters/Genres";
import Pagination from "../Filters/Pagination";
import PropTypes from "prop-types";
const FiltersOptions = {
  sort_by: [
    {
      label: "Популярные по убыванию",
      value: "popularity.desc"
    },
    {
      label: "Популярные по возростанию",
      value: "popularity.asc"
    },
    {
      label: "Рейтинг по убыванию",
      value: "vote_average.desc"
    },
    {
      label: "Рейтинг по возростанию",
      value: "vote_average.asc"
    }
  ],
  primary_release_years: [
    {label: 2014, value: 2014},
    {label: 2015, value: 2015},
    {label: 2016, value: 2016},
    {label: 2017, value: 2017},
    {label: 2018, value: 2018},
    {label: 2019, value: 2019}
  ]
}
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
      onSelect,
      onCheckGenre,
      onChangePage,
      onClearFilters
    } = this.props;
    return (
      <form className="mb-3">
        <Select
          className="form-control"
          id="sort_by"
          label="Сортировка"
          name="sort_by"
          value={sort_by}
          options={FiltersOptions.sort_by}
          onSelect={onSelect}
        />
        <Select
          className="form-control"
          id="primary_release_year"
          label="Год"
          name="primary_release_year"
          value={primary_release_year}
          options={FiltersOptions.primary_release_years}
          onSelect={onSelect}
        />

        <Genres with_genres={with_genres} onCheckGenre={onCheckGenre} />

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
