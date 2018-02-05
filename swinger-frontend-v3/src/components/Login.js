import React from "react";
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
      default:
        return null;
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
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <h2 className="ui image header">
            <div className="content">Log-in to your account</div>
          </h2>
          <form onSubmit={this.handleSubmit} className="ui large form">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon" />
                <input
                  onChange={this.handleChange}
                  type="text"
                  name="username"
                  value={this.state.username}
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
                  value={this.state.password}
                  placeholder="Password"
                />
              </div>
            </div>
            <button className="ui fluid large teal submit button">Login</button>
            <div className="ui error message" />
          </form>
          <br />
          <br />
          New to Swinger ?
          <br />
          <button className="small ui teal basic button" onClick={register}>
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Login);
