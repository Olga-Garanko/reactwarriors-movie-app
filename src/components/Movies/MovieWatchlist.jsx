import React from "react";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CallApi from "../../api/api";
import PropTypes from "prop-types";
import { withAuth } from '../../hoc/withAuth';

class MovieWatchlist extends React.Component {

  state = {
    submitting: false
  };

  isWatchlist = () => {
    const { id, watchlist } = this.props;
    return watchlist.findIndex(item => item.id === id) !== -1;
  }

  changeWatchlist = () => {
    const { session_id, toggleLoginModal, id, getWatchlist, user } = this.props;
    if (session_id) {
      this.setState({
        submitting: true
      });
      CallApi.post(`/account/${user.id}/watchlist`, {
        params: {
          session_id
        },
        body: {
          media_type: 'movie',
          media_id: id,
          watchlist: !this.isWatchlist()
        }
      })
      .then(() => {
        getWatchlist({user, session_id})
      })
      .then(() => {
          this.setState({
            submitting: false
          });
        })
    } else toggleLoginModal()
  }

  render() {
    const { session_id } = this.props;
    return (
      <span>
      { session_id && this.isWatchlist() ? <BookmarkIcon onClick={this.changeWatchlist} /> : <BookmarkBorderIcon onClick={this.changeWatchlist} /> }
      </span>
    )
  }
}

MovieWatchlist.defaultProps = {
  watchlist: []
};

MovieWatchlist.propTypes = {
  id: PropTypes.number,
  watchlist: PropTypes.array
};

export default withAuth(MovieWatchlist);

