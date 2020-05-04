import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";
import { AppContext } from "../../App";

class Login extends React.Component {
  render() {
    const { showLoginModal, toggleLoginModal } = this.props;
    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={toggleLoginModal}
        >
          Login
        </button>
        <Modal isOpen={showLoginModal} toggle={toggleLoginModal}>
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const LoginContainer = props => {
  return (
    <AppContext.Consumer>
      {context => {
        return <Login showLoginModal={context.showLoginModal}  toggleLoginModal={context.toggleLoginModal} {...props} />;
      }}
    </AppContext.Consumer>
  );
};

LoginContainer.displayName = "LoginContainer";

export default LoginContainer;
