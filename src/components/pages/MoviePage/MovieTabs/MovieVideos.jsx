import React from "react";
import "../MoviePage.css";
import CallApi from "../../../../api/api";

class Videos extends React.Component {

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
          !loading && movieVideos && movieVideos.length && movieVideos.map(i => {
            switch (i.site) {
              case "YouTube":
                return <div key={i.key}>
                  <iframe width="560" height="315" src={`https://www.youtube.com/embed/${i.key}`} frameBorder="0"  title={i.name} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>;
              case "Vimeo":
                return <div key={i.key}>
                  <iframe src={`https://player.vimeo.com/video/${i.key}`} width="560" height="315" frameBorder="0" title={i.name} webkitallowfullscreen mozallowfullscreen allowFullScreen />
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

export default Videos;
