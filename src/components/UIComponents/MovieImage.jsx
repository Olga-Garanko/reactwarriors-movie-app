import React from "react";
import PropTypes from "prop-types";

const mainSrc = 'https://image.tmdb.org/t/p/w500';

export default class MovieImage extends React.Component {
  static propTypes = {
    path: PropTypes.string,
    title: PropTypes.string
  };

  static defaultProps = {
    path: '',
    title: ''
  };

  render() {
    const { path, title } = this.props;
    return (
      <img src={`${mainSrc}${path}`} className="card-img-top card-img--height" alt={title} />
    );
  }
}
