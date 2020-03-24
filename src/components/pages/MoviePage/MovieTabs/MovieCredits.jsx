import React from "react";
import CallApi from "../../../../api/api";

class MovieCredits extends React.Component {

  state = {
    loading: false,
    movieCredits: []
  };

  componentDidMount() {
    this.setState({
      loading: true
    });
    CallApi.get(`/movie/${this.props.id}/credits`)
      .then(res => {
        this.setState({
          movieCredits: res.cast,
          loading: false
        });
      }
      );
  }

  render() {
    const { loading, movieCredits } = this.state;
    return (
      <div className="mt-4 row">
        { loading && <div>...loading</div>}
        { !loading && movieCredits && movieCredits.length && movieCredits.map(i =>
          i.profile_path && <div key={i.id} className="col-2 mb-2">
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
