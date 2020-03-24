import React from "react";
import {Nav, NavItem} from "reactstrap";
import {NavLink} from "react-router-dom";

const tabs = [
  { link: '', name: 'Детали' },
  { link: '/videos', name: 'Видео' },
  { link: '/actors', name: 'Актеры' }
]
class MovieTabs extends React.Component {

  render() {
    const { url } = this.props;
    return (
      <Nav tabs>
        { tabs.length && tabs.map(tab =>
          <NavItem>
            <NavLink exact to={`${url}${tab.link}`} className="nav-link">
              {tab.name}
            </NavLink>
          </NavItem>
        )}
      </Nav>
    );
  }
}

export default MovieTabs;
