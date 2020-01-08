import React from "react";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CallApi from "../../api/api";
import PropTypes from "prop-types";
import AppContextHOC from "../HOC/AppContextHOC";

class MovieWatchlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      watchlist: props.watchlist.find(i => i.id === props.id)
    };
  }

  changeWatchlist = () => {
    const { session_id, toggleModal } = this.props;
    if (session_id) {
      CallApi.post(`/account/${session_id}/watchlist`, {
        params: {
          session_id: session_id
        },
        body: {
          media_type: 'movie',
          media_id: this.props.id,
          watchlist: !this.state.watchlist
        }
      })
      .then(user => {
        this.setState(state => ({ watchlist: !state.watchlist }));
      })
    } else toggleModal()
  }

  render() {
    const { session_id } = this.props;
    const { watchlist } = this.state;
    return (
      <span>
      { session_id && watchlist ? <BookmarkIcon onClick={this.changeWatchlist} /> : <BookmarkBorderIcon onClick={this.changeWatchlist} /> }
      </span>
    )
  }
}

MovieWatchlist.defaultProps = {
  id: null,
  watchlist: []
};

MovieWatchlist.propTypes = {
  id: PropTypes.number.isRequired,
  watchlist: PropTypes.array
};

export default AppContextHOC(MovieWatchlist);

