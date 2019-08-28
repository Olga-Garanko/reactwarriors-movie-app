import React from "react";
import Select from "../Common/Select";
import PropTypes from "prop-types";

const primary_release_years = [
  {label: 2014, value: "2014"},
  {label: 2015, value: "2015"},
  {label: 2016, value: "2016"},
  {label: 2017, value: "2017"},
  {label: 2018, value: "2018"},
  {label: 2019, value: "2019"}
]

export default class ReleaseYear extends React.Component {
  static propTypes = {
    primary_release_year: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  onChangeYear = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.props.onChange(name, value);
  };

  render() {
    const { primary_release_year } = this.props;
    return (
        <Select
          className="form-control"
          id="primary_release_year"
          label="Год"
          name="primary_release_year"
          value={primary_release_year}
          options={primary_release_years}
          onChange={this.onChangeYear}
        />
    );
  }
}
