import React from "react";

class MovieCredits extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div className="mt-4 row">
        { data && data.map(i =>
            <div key={i.id} className="col-2">
              <img
                className="card-img-top card-img--height"
                src={`https://image.tmdb.org/t/p/w500${i.profile_path}`}
                alt="i.name"
              />
            </div>
        )}
      </div>
    );
  }
}

export default MovieCredits;
