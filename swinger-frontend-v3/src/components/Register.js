import React from "react";
import { newUser } from "../adapters";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleClick = () => {
    newUser({ username: this.state.username, password: this.state.password });
    this.props.login();
  };

  handleChange = e => {
    let input = e.target.name;
    let value = e.target.value.toLowerCase();

    switch (input) {
      case "username":
        this.setState({ username: value });
        break;
      case "password":
        this.setState({ password: value });
        break;
      case "confirmPassword":
        this.setState({ confirmPassword: value });
        break;
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <h2 className="ui image header">
            <div className="content">Sign Up!</div>
          </h2>

          <form className="ui large form">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon" />
                <input
                  onChange={this.handleChange}
                  type="text"
                  name="username"
                  placeholder="Username"
                />
              </div>
            </div>

            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon" />
                <input
                  onChange={this.handleChange}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon" />
                <input
                  onChange={this.handleChange}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <button
              onClick={this.handleClick}
              className="ui fluid large teal submit button"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
