import React from "react";
import MovieItem from "../../Movies/MovieItem";

class Videos extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        { data.map(i => <MovieItem item={i.id} key={i.id} />)}
      </div>
    );
  }
}

export default Videos;
