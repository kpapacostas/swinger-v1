import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class RoleDisplay extends React.Component {
  // deleteRole = () => {};

  handleRoleClick = (e) => {
    console.log("in role display", e.target);
    this.props.changeRole(null, e.target.children[0].id);
    this.props.changeRoleDisplay();
  };

  currentShowRoles = () => {
    if (this.props.currentShow.scene_roles[0].roles[0].id) {
      return this.props.currentShow.scene_roles[0].roles.map((r, i) => (
        <div
          key={i}
          onClick={this.handleRoleClick}
          className="ui tiny teal basic button"
        >
          <p id={r.id}>{r.name}</p>
        </div>
      ));
    }
  };

  render() {
    return (
      <div>
        {this.props.currentShow.scene_roles[0].roles[0].id
          ? this.currentShowRoles()
          : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentShow: state.currentShow,
  };
};

export default connect(mapStateToProps, actions)(RoleDisplay);
