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
      with_genres: []
  };

  onChangeFilters = event => {
    const name = event.target.name;
    const value = event.target.value;    
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value
      }
    }));
  };

  onChangePage = (page, total_pages = this.state.total_pages) => {
    this.setState({
      page,
      total_pages
    });
  };

  onClearFilters = () => {
    this.setState({
      filters: this.initialFilters,
      page: 1,
      total_pages: 0
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
