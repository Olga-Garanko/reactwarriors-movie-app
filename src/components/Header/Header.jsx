import React from "react";
import Login from "./Login/Login";
import User from "./User";
import { AppContext } from "../App";

class Header extends React.Component {
  render() {
    const { user } = this.props;
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
          { user ? <User /> : <Login /> }
        </div>
      </nav>
    );
  }
}

const HeaderContainer = props => {
  return (
    <AppContext.Consumer>
      {context => {
        return <Header user={context.user} {...props} />;
      }}
    </AppContext.Consumer>
  );
};

HeaderContainer.displayName = "HeaderContainer";

export default HeaderContainer;
