import React from "react";
import Select from "../Common/Select";
import PropTypes from "prop-types";

const sortOptions = [
  {
    label: "Популярные по убыванию",
    value: "popularity.desc"
  },
  {
    label: "Популярные по возростанию",
    value: "popularity.asc"
  },
  {
    label: "Рейтинг по убыванию",
    value: "vote_average.desc"
  },
  {
    label: "Рейтинг по возростанию",
    value: "vote_average.asc"
  }
]

export default class Sort extends React.Component {
  static propTypes = {
    sort_by: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const { sort_by, onChange } = this.props;
    return (
      <div className="mb-3">
        <Select
          className="form-control"
          id="sort_by"
          label="Сортировка"
          name="sort_by"
          value={sort_by}
          options={sortOptions}
          onChange={onChange}
        />
      </div>
    );
  }
}
