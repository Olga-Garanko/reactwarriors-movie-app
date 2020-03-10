import React from "react";
import CallApi from "../../../api/api";
import { TabContent, TabPane, Nav, NavItem, NavLink as NavLinkItem } from 'reactstrap';
import Actors from "../../Movie/Actors";
import Videos from "../../Movie/Videos";
import Details from "../../Movie/Details";
import {
  Switch,
  Route,
  NavLink
} from "react-router-dom";

export default class MoviePage extends React.Component {
  componentDidMount() {
    CallApi.get(`/movie/${this.props.match.params.id}`)
    console.log(this.props.match);
  }
  render() {
    return (
      <div>
      Movie Page
      {this.props.match.params.id}
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink exact to={this.props.match.url} activeClassName="active" className="nav-link">
                details
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={`${this.props.match.url}/videos`} activeClassName="active" className="nav-link">
                videos
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={`${this.props.match.url}/actors`} activeClassName="active" className="nav-link">
                actors
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent>
          <Switch>
            <Route path={`${this.props.match.url}`} exact >
              <Details />
            </Route>
            <Route path={`${this.props.match.url}/videos`}>
              <Videos />
            </Route>
            <Route path={`${this.props.match.url}/actors`}>
              <Actors />
            </Route>
          </Switch>
        </TabContent>
      </div>
      </div>
    );
  }
}
