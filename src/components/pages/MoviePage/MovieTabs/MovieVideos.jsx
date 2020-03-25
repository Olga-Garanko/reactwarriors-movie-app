import React from "react";
import CallApi from "../../../../api/api";

class MovieVideos extends React.Component {

  state = {
    loading: false,
    movieVideos: []
  };

  componentDidMount() {
    this.setState({
      loading: true
    });
    CallApi.get(`/movie/${this.props.id}/videos`)
      .then(res => {
            this.setState({
              movieVideos: res.results,
              loading: false
            });
          }
      );
  }

  render() {
    const { loading, movieVideos } = this.state;
    return (
      <div className="mt-4">
        { loading && <div>...loading</div>}
        {
          !loading && movieVideos.length && movieVideos.map(video => {
            switch (video.site) {
              case "YouTube":
                return <div key={video.key}>
                  <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video.key}`} frameBorder="0"  title={video.name} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>;
              case "Vimeo":
                return <div key={video.key}>
                  <iframe src={`https://player.vimeo.com/video/${video.key}`} width="560" height="315" frameBorder="0" title={video.name} webkitallowfullscreen mozallowfullscreen allowFullScreen />
                </div>;
              default:
                return null;
            }
          }
          )
        }
      </div>
    );
  }
}

export default MovieVideos;
