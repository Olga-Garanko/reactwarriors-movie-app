import React from "react";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CallApi from "../../api/api";
import PropTypes from "prop-types";
import AppContextHOC from "../HOC/AppContextHOC";

class MovieFavorite extends React.Component {
  
  state = {
    submitting: false
  };

  isFavorite = () => {
    const { id, favorites } = this.props;
    return favorites.findIndex(item => item.id === id) !== -1;
  }

  changeFavorite = () => {
    const { session_id, toggleModal, id, getFavorites, user } = this.props;
    if (session_id) {
      this.setState({
        submitting: true
      });
      CallApi.post(`/account/${user.id}/favorite`, {
        params: {
          session_id: session_id
        },
        body: {
          media_type: 'movie',
          media_id: id,
          favorite: !this.isFavorite()
        }
      })
      .then(() => {
        getFavorites({user, session_id})
      })
      .then(() => {
          this.setState({
            submitting: false
          });
        });
    } else toggleModal()
  }

  render() {
    const { session_id } = this.props;
    const { submitting } = this.state;
    return (
      <span>
      { session_id && this.isFavorite() ? <StarIcon onClick={this.changeFavorite} /> : <StarBorderIcon onClick={this.changeFavorite} /> }
      </span>
    )
  }
}

MovieFavorite.defaultProps = {
  favorites: []
};

MovieFavorite.propTypes = {
  id: PropTypes.number,
  favorites: PropTypes.array
};

export default AppContextHOC(MovieFavorite);

