import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    let input = e.target.name;
    let value = e.target.value;

    switch (input) {
      case "username":
        this.setState({ username: value.toLowerCase() });
        break;
      case "password":
        this.setState({ password: value });
        break;
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleLogin({
      username: this.state.username,
      password: this.state.password
    });
  };

  render() {
    const register = this.props.register;

    return (
      <div class="ui middle aligned center aligned grid">
        <div class="column">
          <h2 class="ui image header">
            <div class="content">Log-in to your account</div>
          </h2>
          <form onSubmit={this.handleSubmit} class="ui large form">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon" />
                <input
                  onChange={this.handleChange}
                  type="text"
                  name="username"
                  value={this.state.username}
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
                  value={this.state.password}
                  placeholder="Password"
                />
              </div>
            </div>
            <button class="ui fluid large teal submit button">Login</button>
            <div class="ui error message" />
          </form>
          <br />
          <br />
          New to Swinger ?
          <br />
          <button class="small ui teal basic button" onClick={register}>
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Login);
