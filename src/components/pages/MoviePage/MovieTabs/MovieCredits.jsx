import React from "react";
import CallApi from "../../../../api/api";
import MovieImage from "../../../UIComponents/MovieImage";

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
        { !loading && movieCredits.length && movieCredits.map(actor =>
            actor.profile_path && <div key={actor.id} className="col-2 mb-2">
              <MovieImage title={actor.name} path={actor.profile_path} />
          </div>
        )}
      </div>
    );
  }
}

export default MovieCredits;
