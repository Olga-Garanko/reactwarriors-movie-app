import React from "react";
import PropTypes from "prop-types";

const mainSrc = 'https://image.tmdb.org/t/p/w500';

export default class MovieImage extends React.Component {
  static propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string
  };

  static defaultProps = {
    src: '',
    alt: '',
    className: ''
  };

  render() {
    const { src, alt, className } = this.props;
    return (
      <img src={`${mainSrc}${src}`} className={`card-img-top card-img--height ${className}`} alt={alt} />
    );
  }
}
