import React from "react";
import Checkbox from "../Common/Checkbox";
import { API_URL, API_KEY_3 } from "../../api/api";
import PropTypes from "prop-types";

export default class Genres extends React.Component {
  constructor() {
    super();

    this.state = {
      genres: []
    };
  }
  static propTypes = {
    with_genres: PropTypes.array.isRequired,
    onCheckGenre: PropTypes.func.isRequired
  };

  getGenres = () => {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          genres: data.genres
        });
      });
  };

  componentDidMount() {
    this.getGenres();
  }

  render() {
    const { genres } = this.state;
    const { with_genres, onCheckGenre } = this.props;
    return (
      <div className="form-group">
        <p>Genres</p>
        <div className="genres">
          {genres.map(genre => {
            return (
              <Checkbox
                key={genre.id}
                className="form-check-input"
                type="checkbox"
                id={genre.id}
                label={genre.name}
                name={genre.id}
                onCheck={onCheckGenre}
                checked={with_genres.includes(genre.id)}
              />
            );
          })}
        </div>
      </div>  
    );
  }
}
