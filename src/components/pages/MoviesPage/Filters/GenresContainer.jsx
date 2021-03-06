import React from "react";
import Genres from "./Genres";
import CallApi from "../../api/api";

class GenresContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      genresList: []
    };
  }

  componentDidMount() {
       CallApi.get('/genre/movie/list')
        .then(response => {
          return response;
        })
        .then(data => {
          this.setState({
            genresList: data.genres
          });
        });
  }

  onChangeGenres = event => {
    this.props.onChangeFilters({
      target: {
        name: "with_genres",
        value: event.target.checked
          ? [...this.props.with_genres, event.target.value]
          : this.props.with_genres.filter(genre => genre !== event.target.value)
      }
    });
  };

  resetGenres = () => {
    this.props.onChangeFilters({
      target: {
        name: "with_genres",
        value: []
      }
    });
  };

  render() {
    const { genresList } = this.state;
    const { with_genres } = this.props;
    return <Genres genresList={genresList} with_genres={with_genres} resetGenres={this.resetGenres} onChangeGenres={this.onChangeGenres} />;
  }
}

export default GenresContainer;
