import React from "react";
import CallApi from "../../../api/api";
import { TabContent, Nav, NavItem } from 'reactstrap';
import MovieCredits from "./MovieCredits";
import MovieVideos from "./MovieVideos";
import MovieDetail from "./MovieDetail";
import { Switch, Route, NavLink } from "react-router-dom";
import MovieFavorite from "../../Movies/MovieFavorite";
import MovieWatchlist from "../../Movies/MovieWatchlist";
import MovieRated from "../../Movies/MovieRated";

export default class MoviePage extends React.Component {
  state = {
    movieDetail: {},
    movieVideos: [],
    movieCredits: []
  };

  getData() {
    CallApi.get(`/movie/${this.props.match.params.id}`,
        {params: {
            language: "ru-RU"
          }})
        .then(res => {
              this.setState({
                movieDetail: res
              });
            }
        );
    CallApi.get(`/movie/${this.props.match.params.id}/videos`)
        .then(res => {
              this.setState({
                movieVideos: res.results
              });
            }
        );
    CallApi.get(`/movie/${this.props.match.params.id}/credits`)
        .then(res => {
              this.setState({
                movieCredits: res.cast
              });
            }
        );
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id){
      this.getData();
    }
  }
  componentDidMount() {
    this.getData();
  }
  render() {
    const { movieDetail, movieVideos, movieCredits } = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <img src={`https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path || movieDetail.poster_path}`} className="card-img-top card-img--height" alt={movieDetail.title} />
          </div>
          <div className="col-8">
            <h2>{movieDetail.title}</h2>
            <p className="mt-4">{movieDetail.overview}</p>
            <p>Рейтинг Пользователей: {movieDetail.vote_average}</p>
            <div>
              <div><MovieRated id={movieDetail.id} /> Укажите рейтинг</div>
              <div className="float-right"><MovieFavorite id={movieDetail.id} /><MovieWatchlist id={movieDetail.id} /></div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <div>
              <Nav tabs>
                <NavItem>
                  <NavLink exact to={this.props.match.url} className="nav-link">
                    Детали
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to={`${this.props.match.url}/videos`} className="nav-link">
                    Похожие фильмы
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to={`${this.props.match.url}/actors`} className="nav-link">
                    Актеры
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent>
                <Switch>
                  <Route path={`${this.props.match.url}`} exact >
                    <MovieDetail data={movieDetail} />
                  </Route>
                  <Route path={`${this.props.match.url}/videos`}>
                    <MovieVideos data={movieVideos} />
                  </Route>
                  <Route path={`${this.props.match.url}/actors`}>
                    <MovieCredits data={movieCredits} />
                  </Route>
                </Switch>
              </TabContent>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
