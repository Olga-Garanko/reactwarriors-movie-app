import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";
/*import PropTypes from "prop-types";*/

export default class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };
  }
/*  static propTypes = {
    filters: PropTypes.object.isRequired
  };
  static defaultProps = {
    filters: {
      sort_by: "popularity.desc",
      primary_release_year: 2018
    }
  };*/

  getMovies = (filters, page) => {
    let filtersParam = '';
    Object.keys(filters).forEach(item => {
      if (filters[item]) filtersParam += `&${item}=${filters[item]}`
    })
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&page=${page}${filtersParam}`;
    console.log(link)
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results
        });
      });
  };

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.page);
  }

  componentDidUpdate(prevProps) {
    console.log("componentDidUpdate", prevProps.page, this.props.page);
    if (this.props.filters.sort_by !== prevProps.filters.sort_by || this.props.filters.primary_release_year !== prevProps.filters.primary_release_year) {
      this.props.onChangePage(1);
      this.getMovies(this.props.filters, 1);
    }

    if (this.props.page !== prevProps.page) {
      this.getMovies(this.props.filters, this.props.page);
    }
  }

  render() {
    const { movies } = this.state;
    console.log("filters", this.props.filters);
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
