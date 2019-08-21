import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";
import PropTypes from "prop-types";

export default class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };
  }
  static propTypes = {
    filters: PropTypes.object.isRequired,
    onChangePage: PropTypes.func.isRequired
  };

  getMovies = (filters, page) => {
    const { with_genres, ...restFilters } = this.props.filters;
    const filtersParam = Object.keys(restFilters).reduce((acc, item) => {
      acc += `&${item}=${restFilters[item]}`
      return acc
    }, "");
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&page=${page}&${filtersParam}&with_genres=${with_genres.join(',')}`;
    console.log(link);
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.props.onChangePage(data.page, data.total_pages);
        this.setState({
          movies: data.results
        });        
      })
  };

  componentDidMount() {
    const { filters, page } = this.props;
    this.getMovies(filters, page);
  }

  componentDidUpdate(prevProps) {
    const { filters : { sort_by, primary_release_year, with_genres }, filters, page, onChangePage } = this.props;
    if (sort_by !== prevProps.filters.sort_by || primary_release_year !== prevProps.filters.primary_release_year || with_genres !== prevProps.filters.with_genres) {
      onChangePage(1);
      this.getMovies(filters, 1);
    }

    if (page !== prevProps.page) {
      this.getMovies(filters, page);
    }
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="row">
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}
