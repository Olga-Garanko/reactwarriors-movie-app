import React from "react";
import PropTypes from "prop-types";

export default class Pagination extends React.Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    total_pages: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const {
      page,
      total_pages,
      onChange
    } = this.props;
    return (
        <div className="form-group">
          <p>Страница {page} из {total_pages} </p>
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-light m-r-2"
              disabled={page === 1}
              onClick={() => onChange(page - 1, total_pages)}
            >
              Назад
            </button>
            <button
              type="button"
              className="btn btn-light"
              disabled={page === total_pages}
              onClick={() => onChange(page + 1, total_pages)}
            >
              Вперед
            </button>
          </div>
        </div>
    );
  }
}
