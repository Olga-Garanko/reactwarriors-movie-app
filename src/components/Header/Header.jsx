import React from "react";
import Login from "./Login/Login";
import User from "./User";
import { withAuth } from '../../hoc/withAuth';

class Header extends React.Component {
  render() {
  const { auth } = this.props;
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a href="/" className="nav-link">
                Home
              </a>
            </li>
          </ul>
          { auth.user ? <User /> : <Login /> }
        </div>
      </nav>
    );
  }
}

export default withAuth(Header);
