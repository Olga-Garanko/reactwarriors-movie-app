import React from "react";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CallApi from "../../api/api";
import PropTypes from "prop-types";
import AppContextHOC from "../HOC/AppContextHOC";

class MovieFavorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: props.favorites.find(i => i.id === props.id)
    };
  }

  changeFavorite = () => {
    const { session_id, toggleModal } = this.props;
    if (session_id) {
      CallApi.post(`/account/${session_id}/favorite`, {
        params: {
          session_id: session_id
        },
        body: {
          media_type: 'movie',
          media_id: this.props.id,
          favorite: !this.state.favorites
        }
      })
      .then(user => {
        this.setState(state => ({ favorites: !state.favorites }));
      })
    } else toggleModal()
  }

  render() {
    const { session_id } = this.props;
    const { favorites } = this.state;
    return (
      <span>
      { session_id && favorites ? <StarIcon onClick={this.changeFavorite} /> : <StarBorderIcon onClick={this.changeFavorite} /> }
      </span>
    )
  }
}

MovieFavorite.defaultProps = {
  id: null,
  favorites: []
};

MovieFavorite.propTypes = {
  id: PropTypes.number.isRequired,
  favorites: PropTypes.array
};

export default AppContextHOC(MovieFavorite);

