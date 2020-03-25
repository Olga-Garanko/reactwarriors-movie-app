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
    const { url } = this.props.match;
    return (
      <Nav tabs>
        { tabs.length && tabs.map((tab, inx) =>
          <NavItem key={inx}>
            <NavLink exact={tab.exact} to={`${url}${tab.link}`} className="nav-link">
              {tab.name}
            </NavLink>
          </NavItem>
        )}
      </Nav>
    );
  }
}

export default withRouter(MovieTabs);
