import React from "react";
import Select from "../Common/Select";
import PropTypes from "prop-types";

const sort_opt = [
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

  onChangeSortBy = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.props.onChange(name, value);
  };

  render() {
    const { sort_by } = this.props;
    return (
      <div className="mb-3">
        <Select
          className="form-control"
          id="sort_by"
          label="Сортировка"
          name="sort_by"
          value={sort_by}
          options={sort_opt}
          onChange={this.onChangeSortBy}
        />
      </div>
    );
  }
}
