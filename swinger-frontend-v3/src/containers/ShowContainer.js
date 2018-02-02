import React from "react";
import { connect } from "react-redux";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import withAuth from "../hocs/withAuth";

class ShowContainer extends React.Component {
  render() {
    console.log("in show container");
    const currentUser = this.props.currentUser;
    return (
      <div>
        <Navbar handleLogout={this.props.handleLogout} />
        <Sidebar />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};
export default withAuth(connect(mapStateToProps)(ShowContainer));
