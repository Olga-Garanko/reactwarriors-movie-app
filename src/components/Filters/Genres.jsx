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
    onChange: PropTypes.func.isRequired
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

  onChangeGenre = event => {
    const { with_genres } = this.props;
    const value = parseInt(event.target.value);
    const checked = event.target.checked;
    const values = checked ?
            [...with_genres, value] :
            with_genres.filter(item => Number(item) !== Number(value))
    this.props.onChange('with_genres', values);
  };

  render() {
    const { genres } = this.state;
    const { with_genres } = this.props;
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
                value={genre.id}
                onChange={this.onChangeGenre}
                checked={with_genres.includes(genre.id)}
              />
            );
          })}
        </div>
      </div>  
    );
  }
}
