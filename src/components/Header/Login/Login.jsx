import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";
import { AppContext } from "../../App";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };
  }

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  };

  componentDidMount() {
    const { session_id } = this.props;
    this.setState({
      showModal: !session_id
    });
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={this.toggleModal}
        >
          Login
        </button>
        <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
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
        return <Login session_id={context.session_id} {...props} />;
      }}
    </AppContext.Consumer>
  );
};

LoginContainer.displayName = "LoginContainer";

export default LoginContainer;
