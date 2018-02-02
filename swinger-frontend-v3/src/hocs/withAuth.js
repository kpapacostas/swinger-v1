import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../actions";

const withAuth = WrappedComponent => {
  class AuthedComponent extends React.Component {
    componentDidMount() {
      if (localStorage.getItem("token") && !this.props.loggedIn) {
        this.props.fetchUser();
      }
    }

    render() {
      if (this.props.loggedIn) {
        return this.props.loggedIn ? (
          <WrappedComponent {...this.props} />
        ) : (
          <Redirect to="/" />
        );
      } else {
        return null;
      }
    }
  }

  const mapStateToProps = state => ({
    loggedIn: !!state.currentUser.id
  });

  return connect(mapStateToProps, actions)(AuthedComponent);
};

export default withAuth;
