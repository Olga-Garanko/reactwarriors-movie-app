import React from "react";

class MovieDetail extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div className="mt-4">
        <table className="table">
          <tbody>
          <tr>
            <th>Статус</th>
            <td>{data.status}</td>
          </tr>
          <tr>
            <th>Дата выхода</th>
            <td>{data.release_date}</td>
          </tr>
          <tr>
            <th>Продолжительность</th>
            <td>{data.runtime} минут</td>
          </tr>
          <tr>
            <th>Язык оригинала</th>
            <td>{data.original_language}</td>
          </tr>
          <tr>
            <th>Страна</th>
            <td>
              { data.production_countries && data.production_countries.map( i => <div key={i.iso_3166_1}>{i.name} </div>)}
            </td>
          </tr>
          <tr>
            <th>Бюджет</th>
            <td>{data.budget}$</td>
          </tr>
          <tr>
            <th>Сборы</th>
            <td>{data.revenue}$</td>
          </tr>
          <tr>
            <th>Компания</th>
            <td>
              { data.production_companies && data.production_companies.map(i => <div key={i.id}><span className="badge badge-info mr-4">{i.name}</span></div>)}
            </td>
          </tr>
          <tr>
            <th>Жанры</th>
            <td>
              { data.genres && data.genres.map(i => <div key={i.id}><span className="badge badge-info mr-4">{i.name}</span></div>) }
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default MovieDetail;
