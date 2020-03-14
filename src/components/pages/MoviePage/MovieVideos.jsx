import React from "react";
import MoviesList from "../../Movies/MoviesList";
import Pagination from "../../Filters/Pagination";
import "./MoviePage.css";

class Videos extends React.Component {

  constructor() {
    super();

    this.state = {
      filters: {
        sort_by: "popularity.desc",
        primary_release_year: '',
        with_genres: []
      },
      page: 1,
      total_pages: ""
    };
  }
  onChangePagination = ({ page, total_pages = this.state.total_pages }) => {
    this.setState({
      page,
      total_pages
    });
  };

  render() {
    const { filters, page, total_pages } = this.state;
    return (
      <div className="mt-4">
        <div className="d-flex justify-content-end">
          <div>
            <Pagination
                page={page}
                total_pages={total_pages}
                onChangePagination={this.onChangePagination}
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="videos">
            <MoviesList
                filters={filters}
                page={page}
                onChangePagination={this.onChangePagination}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Videos;
