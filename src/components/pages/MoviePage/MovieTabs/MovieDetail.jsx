import React from "react";

class MovieDetail extends React.Component {

  render() {
    const { movieDetail } = this.props;
    return (
      <div className="mt-4">
        <table className="table">
          <tbody>
          <tr>
            <th>Статус</th>
            <td>{movieDetail.status}</td>
          </tr>
          <tr>
            <th>Дата выхода</th>
            <td>{movieDetail.release_date}</td>
          </tr>
          <tr>
            <th>Продолжительность</th>
            <td>{movieDetail.runtime} минут</td>
          </tr>
          <tr>
            <th>Язык оригинала</th>
            <td>{movieDetail.original_language}</td>
          </tr>
          <tr>
            <th>Страна</th>
            <td>
              { movieDetail.production_countries && movieDetail.production_countries.map( i => <div key={i.iso_3166_1}>{i.name} </div>)}
            </td>
          </tr>
          <tr>
            <th>Бюджет</th>
            <td>{movieDetail.budget}$</td>
          </tr>
          <tr>
            <th>Сборы</th>
            <td>{movieDetail.revenue}$</td>
          </tr>
          <tr>
            <th>Компания</th>
            <td>
              { movieDetail.production_companies && movieDetail.production_companies.length && movieDetail.production_companies.map(productionCompany => <div key={productionCompany.id}><span className="badge badge-info mr-4">{productionCompany.name}</span></div>)}
              { movieDetail.production_companies && !movieDetail.production_companies.length && <div>Компании не указаны</div> }
            </td>
          </tr>
          <tr>
            <th>Жанры</th>
            <td>
              { movieDetail.genres && movieDetail.genres.length && movieDetail.genres.map(genre => <div key={genre.id}><span className="badge badge-info mr-4">{genre.name}</span></div>) }
              { movieDetail.genres && !movieDetail.genres.length && <div>Жанры не указаны</div> }
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default MovieDetail;
