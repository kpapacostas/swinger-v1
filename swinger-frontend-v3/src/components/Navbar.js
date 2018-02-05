import React from "react";
import { connect } from "react-redux";
import withAuth from "../hocs/withAuth";

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <div className="ui right menu">
          <div className="ui right item">
            {this.props.currentShow ? (
              <h1 className="full">{`${this.props.currentShow.show.name}`}</h1>
            ) : null}
          </div>
          <div
            onClick={this.props.handleLogout}
            className="ui right button item"
          >
            Sign Out
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    currentShow: state.currentShow
  };
};

export default withAuth(connect(mapStateToProps)(Navbar));
// export default connect(mapStateToProps)(Navbar);
