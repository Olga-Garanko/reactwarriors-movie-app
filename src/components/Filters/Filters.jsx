import React from "react";
import Select from "../Common/Select";
import Checkbox from "../Common/Checkbox";
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
    filters: PropTypes.object.isRequired
  };
  static defaultProps = {
    filters: {
      sort_by: "popularity.desc",
      primary_release_year: 2019,
      with_genres: ""
    }
  }
  render() {
    const {
      filters: { sort_by, primary_release_year },
      page,
      with_genres,
      onSelect,
      onCheck,
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
          label="Сортировка"
          name="primary_release_year"
          value={primary_release_year}
          options={FiltersOptions.primary_release_years}
          onSelect={onSelect}
        />
        <Checkbox
          className="form-check-input"
          type="checkbox"
          id="genre01"
          label="genre01"
          name="genre01"
          value={with_genres}
          onCheck={onCheck}
          checked={with_genres}
        />
        <div className="form-group">
          <button
            type="button"
            className="btn btn-light m-r-2"
            disabled={page === 1}
            onClick={onChangePage.bind(null, page - 1)}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={onChangePage.bind(null, page + 1)}
          >
            Вперед
          </button>
        </div>
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
