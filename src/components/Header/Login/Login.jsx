import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";
import { LoginContext } from "../../App";

class Login extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { showModal, toggleModal } = this.props;
    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={toggleModal}
        >
          Login
        </button>
        <Modal isOpen={showModal} toggle={toggleModal}>
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
    <LoginContext.Consumer>
      {context => {
        return <Login showModal={context.showModal}  toggleModal={context.toggleModal} {...props} />;
      }}
    </LoginContext.Consumer>
  );
};

LoginContainer.displayName = "LoginContainer";

export default LoginContainer;
