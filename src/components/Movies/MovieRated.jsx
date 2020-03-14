import React from "react";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CallApi from "../../api/api";
import PropTypes from "prop-types";
import AppContextHOC from "../HOC/AppContextHOC";

class MovieRated extends React.Component {
  
  state = {
    submitting: false
  };

  isRated = () => {
    const { id, rated } = this.props;
    return rated.findIndex(item => item.id === id) !== -1;
  }

  changeRated = () => {
    const { session_id, toggleModal, id, getRated, user } = this.props;
    console.log('changeRated');
/*    if (session_id) {
      this.setState({
        submitting: true
      });
      CallApi.post(`/account/${user.id}/rated`, {
        params: {
          session_id: session_id
        },
        body: {
          media_type: 'movie',
          media_id: id,
          rated: !this.isRated()
        }
      })
      .then(() => {
        getRated({user, session_id})
      })
      .then(() => {
          this.setState({
            submitting: false
          });
        });
    } else toggleModal()*/
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

export default AppContextHOC(MovieRated);

