import React from "react";
import PropTypes from "prop-types";

export default class Pagination extends React.Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    total_pages: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
  };

  prevPage = () => {
    const {
      page,
      total_pages,
      onChange
    } = this.props;
    onChange(page - 1, total_pages)
  }
  
  nextPage = () => {
    const {
      page,
      total_pages,
      onChange
    } = this.props;
    onChange(page + 1, total_pages)
  }

  render() {
    const {
      page,
      total_pages
    } = this.props;
    return (
        <div className="form-group">
          <p>Страница {page} из {total_pages} </p>
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-light m-r-2"
              disabled={page === 1}
              onClick={this.prevPage}
            >
              Назад
            </button>
            <button
              type="button"
              className="btn btn-light"
              disabled={page === total_pages}
              onClick={this.nextPage}
            >
              Вперед
            </button>
          </div>
        </div>
    );
  }
}
