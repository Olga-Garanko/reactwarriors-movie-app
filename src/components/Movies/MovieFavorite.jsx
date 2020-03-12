import React from "react";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CallApi from "../../api/api";
import PropTypes from "prop-types";
import AppContextHOC from "../HOC/AppContextHOC";

class MovieFavorite extends React.Component {

  state = {
    submitting: false
  };

  isFavorite = () => {
    const { id, favorite } = this.props;
    return favorite.findIndex(item => item.id === id) !== -1;
  }

  changeFavorite = () => {
    const { session_id, toggleModal, id, getFavorite, user } = this.props;
    if (session_id) {
      this.setState({
        submitting: true
      });
      CallApi.post(`/account/${user.id}/favorite`, {
        params: {
          session_id
        },
        body: {
          media_type: 'movie',
          media_id: id,
          favorite: !this.isFavorite()
        }
      })
      .then(() => {
        getFavorite({user, session_id})
      })
      .then(() => {
          this.setState({
            submitting: false
          });
        })
    } else toggleModal()
  }

  render() {
    const { session_id } = this.props;
    return (
      <span>
      { session_id && this.isFavorite() ? <FavoriteIcon onClick={this.changeFavorite} /> : <FavoriteBorderIcon onClick={this.changeFavorite} /> }
      </span>
    )
  }
}

MovieFavorite.defaultProps = {
  favourite: []
};

MovieFavorite.propTypes = {
  id: PropTypes.number,
  favorite: PropTypes.array
};

export default AppContextHOC(MovieFavorite);

