import React from "react";

export default class MovieItem extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div className="card" style={{ width: "100%" }}>
        {
          (item.backdrop_path || item.poster_path) ?
          <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path }`}
          alt=""
          /> :
          <img src='./images/default-avatar.59337bae.png' alt='' /> 
        }
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
          <div className="card-text">Дата выхода: {item.release_date}</div>
        </div>
      </div>
    );
  }
}
