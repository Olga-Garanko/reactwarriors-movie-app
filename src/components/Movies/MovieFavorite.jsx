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

  getFavorite = () => {
    const { id, favorites } = this.props;
    return favorites.find(i => i.id === id)
  }

  changeFavorite = () => {
    const { session_id, toggleModal, id, getFavorites, user } = this.props;
    const { submitting } = this.state;
    if (!submitting && session_id) {
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
          favorite: !this.getFavorite()
        }
      })
      .then(() => {
        getFavorites();
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
      { session_id && this.getFavorite() ? <StarIcon onClick={this.changeFavorite} /> : <StarBorderIcon onClick={this.changeFavorite} /> }
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

