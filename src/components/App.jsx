import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

export default class App extends React.Component {
  constructor() {
    super();

    this.initialFilters = {
        sort_by: "popularity.desc",
        primary_release_year: new Date().getFullYear(),
        with_genres: []
    };

    this.state = {
      filters: this.initialFilters,
      page: 1
    };
  }


  onCheckGenre = event => {

    const newValues = [...this.state.filters.with_genres];

    if (event.target.checked) {
      newValues.push(parseInt(event.target.name))
    } else {
      const index = newValues.indexOf(parseInt(event.target.name));
      if (index !== -1) {
          newValues.splice(index, 1);
      }
    }

    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        with_genres: newValues
      }
    }));
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
    this.setState(prevState => ({
      filters: this.initialFilters,
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
