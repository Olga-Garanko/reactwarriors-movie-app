import React from "react";
import {withRouter} from 'react-router-dom';
import {Nav, NavItem} from "reactstrap";
import {NavLink} from "react-router-dom";

const tabs = [
  { link: '', name: 'Детали', exact: true },
  { link: '/videos', name: 'Видео', exact: false },
  { link: '/actors', name: 'Актеры', exact: false }
]
class MovieTabs extends React.Component {

  render() {
    return (
      <Nav tabs>
        { tabs.map((tab, index) =>
          <NavItem key={index}>
            <NavLink exact={tab.exact} to={`${this.props.match.url}${tab.link}`} className="nav-link">
              {tab.name}
            </NavLink>
          </NavItem>
        )}
      </Nav>
    );
  }
}

export default withRouter(MovieTabs);
