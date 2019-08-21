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
      primary_release_year: new Date().getFullYear(),
      with_genres: []
  };

  onCheckGenre = event => {

    const name = parseInt(event.target.name),
          checked = event.target.checked;

    this.setState(prevState => {

      let newValues = [];

      if (checked) {
        newValues = [...prevState.filters.with_genres, name]
      } else {
        let remove = prevState.filters.with_genres.indexOf(name);
        newValues = [...prevState.filters.with_genres.filter((_, i) => i !== remove)]
      }

      return {
        filters: {
        ...prevState.filters,
        with_genres: newValues
        }
      }
      
    });
  };

  onSelect = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value
      }
    }));
  };

  onChangePage = (page, total_pages) => {
    this.setState({
      page,
      total_pages
    });
  };

  onClearFilters = () => {
    this.setState(prevState => ({
      filters: this.initialFilters,
      page: 1
    }));
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
                  onSelect={this.onSelect}
                  onCheckGenre={this.onCheckGenre}
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
