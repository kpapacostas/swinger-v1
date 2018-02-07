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
    Array.from(document.getElementsByClassName("active item")).map(el => {
      return (el.className = "item");
    });

    e.target.className = "active item";

    this.props.changeCurrentShow(showName);
  };

  showsDisplay = () => {
    return this.shows().map((show, i) => {
      return (
        <a
          name={show.title}
          key={i}
          onClick={this.handleShowClick}
          className="item"
        >
          {show.title}
        </a>
      );
    });
  };

  render() {
    return (
      <div>
        <div className={`ui small left fixed vertical menu`}>
          <div className="item logo">
            <img
              alt=""
              src={require("../closeup.jpg")}
              className="ui medium image item"
            />
          </div>
          <h3 className=" item">MY SHOWS</h3>
          {this.props.loggedIn ? this.showsDisplay() : null}
          <br />
          <div
            id="new"
            onClick={this.props.handleNewShow}
            className="ui small button full"
            href=""
          >
            <i className="add circle icon" />
            Add New Show!
          </div>
          <div
            onClick={this.props.handleLogout}
            className="ui small button full"
            href=""
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

export default withAuth(connect(mapStateToProps, actions)(Sidebar));
// export default connect(mapStateToProps, actions)(Sidebar);
