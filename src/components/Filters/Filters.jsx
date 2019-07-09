import React from "react";
import Select from "../Common/Select";
import Checkbox from "../Common/Checkbox";
import { API_URL, API_KEY_3 } from "../../api/api";
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
  constructor() {
    super();

    this.state = {
      genres: []
    };
  }
  static propTypes = {
    filters: PropTypes.object.isRequired
  };

  getGenres = () => {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          genres: data.genres
        });
      });
  };

  componentDidMount() {
    this.getGenres();
  }

  render() {
    const { genres } = this.state;
    const {
      filters: { sort_by, primary_release_year, with_genres },
      page,
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
          label="Сортировка"
          name="primary_release_year"
          value={primary_release_year}
          options={FiltersOptions.primary_release_years}
          onSelect={onSelect}
        />
        <p>Genres</p>
        <div className="genres">
          {genres.map(genre => {
            return (
              <Checkbox
                key={genre.id}
                className="form-check-input"
                type="checkbox"
                id={genre.id}
                label={genre.name}
                name={genre.id}
                onCheck={onCheckGenre}
                checked={with_genres.includes(genre.id)}
              />
            );
          })}
        </div>
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
