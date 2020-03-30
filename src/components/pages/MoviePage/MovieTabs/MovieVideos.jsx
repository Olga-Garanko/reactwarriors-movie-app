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
    if (loading) {
      return (
          <div className="mt-4">...loading</div>
      )
    }
    return (
      <div className="mt-4">
        { movieVideos.map(video => {
          let siteUrl;
          switch (video.site) {
            case "YouTube":
              siteUrl = "https://www.youtube.com/embed/";
              break;
            case "Vimeo":
              siteUrl = "https://player.vimeo.com/video/";
              break;
            default:
              siteUrl = "";
              break;
          };
          return <div key={video.key}>
            <iframe
                width="560"
                height="315"
                src={`${siteUrl}${video.key}`}
                frameBorder="0"
                title={video.name}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
          </div>
        })
      }
      </div>
    )
  }
}

export default MovieVideos;
