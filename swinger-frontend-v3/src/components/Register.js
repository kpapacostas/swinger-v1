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
      case "password":
        this.setState({ password: value });
      case "confirmPassword":
        this.setState({ confirmPassword: value });
    }
  };

  render() {
    return (
      <div class="ui middle aligned center aligned grid">
        <div class="column">
          <h2 class="ui image header">
            <div class="content">Sign Up!</div>
          </h2>

          <form class="ui large form">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon" />
                <input
                  onChange={this.handleChange}
                  type="text"
                  name="username"
                  placeholder="Username"
                />
              </div>
            </div>

            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon" />
                <input
                  onChange={this.handleChange}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
            </div>

            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon" />
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
              class="ui fluid large teal submit button"
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
