import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import CallApi from "../../api/api";
import { withAuth } from '../../hoc/withAuth';

class User extends Component {
  state = {
    dropdownOpen: false
  };

  toggleDropdown = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  handleLogOut = () => {
    CallApi.delete("/authentication/session", {
      body: {
        session_id: this.props.session_id,
      }
    }).then(() => {
      this.props.onLogOut();
    });
  };

  /*handleLogOut = () => {
    fetchApi(`${API_URL}/authentication/session?api_key=${API_KEY_3}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        session_id: this.props.session_id
      })
    }).then(() => {
      this.props.onLogOut();
    });
  };*/

  render() {
    const { auth } = this.props;
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
        <DropdownToggle
          tag="div"
          onClick={this.toggleDropdown}
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
        >
          <img
            width="40"
            className="rounded-circle"
            src={`https://secure.gravatar.com/avatar/${
              auth.user.avatar.gravatar.hash
            }.jpg?s=64"`}
            alt=""
            onClick={this.toggleDropdown}
          />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={this.handleLogOut}>Выйти</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default withAuth(User);