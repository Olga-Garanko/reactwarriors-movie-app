import React from "react";
import CallApi from "../../../api/api";
import { TabContent } from 'reactstrap';
import MovieCredits from "./MovieTabs/MovieCredits";
import MovieVideos from "./MovieTabs/MovieVideos";
import MovieDetail from "./MovieTabs/MovieDetail";
import { Switch, Route } from "react-router-dom";
import MoviePreview from "./MoviePreview";
import MovieTabs from "./MovieTabs";

export default class MoviePage extends React.Component {
  state = {
    loading: false,
    movieDetail: {}
  };

  componentDidMount() {
    this.getData();
  }

  getData() {
    const { id } = this.props.match.params;
    this.setState({
      loading: true
    });
    CallApi.get(`/movie/${id}`,
      {params: {
          language: "ru-RU"
        }})
      .then(res => {
        this.setState({
          movieDetail: res,
          loading: false
        });
      }
      );
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id){
      this.getData();
    }
  }

  render() {
    const { loading, movieDetail } = this.state;
    const { params: { id }, url } = this.props.match;
    return (
      <div className="container">
        { loading && <div>...loading</div>}
        { !loading && <MoviePreview movieDetail={movieDetail} /> }
        <div className="row mt-4">
          <div className="col-12">
            <MovieTabs />
            <TabContent>
              <Switch>
                <Route path={`${url}`} exact >
                  { loading && <div>...loading</div>}
                  { !loading && <MovieDetail movieDetail={movieDetail} /> }
                </Route>
                <Route path={`${url}/videos`}>
                  <MovieVideos id={id} />
                </Route>
                <Route path={`${url}/actors`}>
                  <MovieCredits id={id} />
                </Route>
              </Switch>
            </TabContent>
          </div>
        </div>
      </div>
    );
  }
}
