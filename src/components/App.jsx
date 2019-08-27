import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      filters: this.initialFilters,
      page: 1,
      total_pages: 0
    };
  }

  initialFilters = {
      sort_by: "popularity.desc",
      primary_release_year: new Date().getFullYear().toString(),
      with_genres: [28]
  };

  onChangeGenre = event => {
    const value = parseInt(event.target.value);
    const checked = event.target.checked;
    this.setState(state => {
      return {
        filters: {
          ...state.filters,
          with_genres: checked ?
            [...state.filters.with_genres, value] :
            state.filters.with_genres.filter(item => Number(item) !== Number(value))
        }
      }
    });
  };

  onChangeFilters = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value
      }
    }));
  };

  onChangePage = (page, total_pages = 0) => {
    this.setState({
      page,
      total_pages
    });
  };

  onClearFilters = () => {
    this.setState({
      filters: this.initialFilters,
      page: 1
    });
  }

  render() {
    const { filters, page, total_pages } = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  page={page}
                  total_pages={total_pages}
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                  onChangeGenre={this.onChangeGenre}
                  onChangePage={this.onChangePage}
                  onClearFilters={this.onClearFilters}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              page={page}
              onChangePage={this.onChangePage}
            />
          </div>
        </div>
      </div>
    );
  }
}
