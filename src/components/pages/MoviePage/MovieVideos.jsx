import React from "react";
import "./MoviePage.css";

class Videos extends React.Component {


  render() {
    const { data } = this.props;
    return (
      <div className="mt-4">
        {
          data.length && data.map(i =>
            (i.site === "YouTube") &&
            <div key={i.key}>
              <a href={`https://www.youtube.com/watch?v=${i.key}`} target="_blank" rel="noopener noreferrer">{i.name}</a>
            </div>
          )
        }
      </div>
    );
  }
}

export default Videos;
