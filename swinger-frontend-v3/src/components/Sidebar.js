import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import withAuth from "../hocs/withAuth";

class Sidebar extends React.Component {
  shows = () => {
    return this.props.currentUser.shows;
  };

  handleShowClick = e => {
    let showName = e.target.innerHTML;

    this.props.fetchCurrentShow(null, showName);
  };

  showsDisplay = () => {
    return this.shows().map((show, i) => {
      return (
        <a key={i} onClick={this.handleShowClick} class="center item">
          {show.name}
        </a>
      );
    });
  };

  render() {
    return (
      <div>
        <div className={`ui large left fixed vertical menu`}>
          <div className="item logo">
            <img
              alt=""
              src={require("../closeup.jpg")}
              className="ui medium image item"
            />
          </div>
          <h3 className="center item">MY SHOWS</h3>
          {this.props.loggedIn ? this.showsDisplay() : null}
          <br />
          <div className="ui small button full" href="">
            <i className="add circle icon" />
            Add New Show!
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

export default withAuth(connect(mapStateToProps, actions)(Sidebar));
// export default connect(mapStateToProps, actions)(Sidebar);
