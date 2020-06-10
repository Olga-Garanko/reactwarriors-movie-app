import React from "react";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CallApi from "../../api/api";
import PropTypes from "prop-types";
import { withAuth } from '../../hoc/withAuth';

class MovieFavorite extends React.Component {

  state = {
    submitting: false
  };

  isFavorite = () => {
    const { id } = this.props;
    const { favorite } = this.props.auth;
    return favorite.findIndex(item => item.id === id) !== -1;
  }

  changeFavorite = () => {
    const { authActions, id } = this.props;
    const { user, session_id } = this.props.auth;
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
        authActions.fetchFavoriteMovies({user, session_id})
      })
      .then(() => {
          this.setState({
            submitting: false
          });
        })
    } else authActions.toggleLoginModal()
  }

  render() {
    const { session_id } = this.props.auth;
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

export default withAuth(MovieFavorite);

