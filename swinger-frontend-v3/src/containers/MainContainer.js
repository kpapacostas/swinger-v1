import React from "react";
import ShowContainer from "./ShowContainer";
import { Route, withRouter } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import { connect } from "react-redux";
import * as actions from "../actions";
// import withAuth from "../hocs/withAuth";

class MainContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginClicked: false,
      registerClicked: false
    };
  }

  componentDidMount = () => {
    // this.props.fetchAllUsers();
  };

  handleLoginClick = () => {
    this.setState({ loginClicked: true, registerClicked: false });
  };

  handleRegisterClick = () => {
    this.setState({ loginClicked: false, registerClicked: true });
  };

  handleLogout = () => {
    this.props.logOut();
    this.setState({ loginClicked: true }, () => this.props.history.push("/"));
  };

  handleLogin = data => {
    this.props.logIn(null, data, this.props.history);
    this.setState({ loginClicked: false, registerClicked: false });
  };

  render() {
    return (
      <div className="container">
        <div>
          {this.props.history.location.pathname === "/" ? (
            <img 
              alt=""
              onClick={this.handleLoginClick}
              className="bounce_button"
              src={require("../logo.jpg")}
            />
          ) : null}
        </div>

        <div className="rightLogin">
          {this.state.loginClicked && !this.state.registerClicked ? (
            <Login
              handleLogin={this.handleLogin}
              register={this.handleRegisterClick}
            />
          ) : null}
          {this.state.registerClicked ? (
            <Register login={this.handleLoginClick} />
          ) : null}
        </div>

        <Route
          path="/home"
          component={() => <ShowContainer handleLogout={this.handleLogout} />}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default withRouter(connect(mapStateToProps, actions)(MainContainer));
