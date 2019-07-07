import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      filters: {
        sort_by: "popularity.desc",
        primary_release_year: 2019,
        with_genres: ""
      },
      initialFilters: {
        sort_by: "popularity.desc",
        primary_release_year: 2019,
        with_genres: ""
      },
      page: 1
    };
  }

  onCheck = event => {
    const newValues = {
      ...this.state.values,
      [event.target.name]: event.target.checked
    };
    this.setState({
      values: newValues
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

  onChangePage = page => {
    this.setState({
      page
    });
  };
  onClearFilters = () => {
    console.log(this.initialFilters)
    this.setState(prevState => ({
      filters: this.state.initialFilters,
      page: 1
    }));
  }

  render() {
    const { filters, page } = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  page={page}
                  filters={filters}
                  onSelect={this.onSelect}
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
