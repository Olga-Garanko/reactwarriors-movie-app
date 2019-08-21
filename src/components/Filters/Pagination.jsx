import React from "react";
import PropTypes from "prop-types";

export default class Pagination extends React.Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    total_pages: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired
  };

  render() {
    const {
      page,
      total_pages,
      onChangePage
    } = this.props;
    return (
        <div className="form-group">
          <div> {page} from {total_pages} </div>
          <button
            type="button"
            className="btn btn-light m-r-2"
            disabled={page === 1}
            onClick={() => onChangePage(page - 1, total_pages)}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => onChangePage(page + 1, total_pages)}
          >
            Вперед
          </button>
        </div>
    );
  }
}
