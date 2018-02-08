import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class RoleDisplay extends React.Component {
  deleteRole = () => {};

  currentShowRoles = () => {
    return this.props.currentShow.scene_roles[0].roles.map((r, i) => (
      <div
        key={i}
        onClick={this.props.displayRoleScenes}
        className="ui tiny teal basic button"
      >
        <p id={r.id}>{r.name}</p>
      </div>
    ));
  };

  render() {
    return <div>{this.props.currentShow ? this.currentShowRoles() : null}</div>;
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    currentShow: state.currentShow
  };
};

export default connect(mapStateToProps)(RoleDisplay);
