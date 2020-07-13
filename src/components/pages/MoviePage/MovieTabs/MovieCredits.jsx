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
    if (loading) {
      return (
          <div className="mt-4">
            <div>...loading</div>
          </div>
      )
    }
    return (
      <div className="mt-4 row">
        { movieCredits.map(actor =>
            actor.profile_path && <div key={actor.credit_id} className="col-2 mb-2">
              <MovieImage alt={actor.name} src={actor.profile_path} />
          </div>
        )}
      </div>
    );
  }
}

export default MovieCredits;
