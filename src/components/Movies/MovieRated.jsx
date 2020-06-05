import React from "react";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PropTypes from "prop-types";
import { withAuth } from '../../hoc/withAuth';

class MovieRated extends React.Component {
  
  state = {
    submitting: false
  };

  isRated = () => {
    const { id, rated } = this.props;
    return rated.findIndex(item => item.id === id) !== -1;
  }

  changeRated = () => {
    console.log('changeRated');
  }

  render() {
    const { session_id } = this.props;
    return (
      <span>
      { session_id && this.isRated() ? <StarIcon onClick={this.changeRated} /> : <StarBorderIcon onClick={this.changeRated} /> }
      </span>
    )
  }
}

MovieRated.defaultProps = {
  favorites: []
};

MovieRated.propTypes = {
  id: PropTypes.number,
  rated: PropTypes.array
};

export default withAuth(MovieRated);

