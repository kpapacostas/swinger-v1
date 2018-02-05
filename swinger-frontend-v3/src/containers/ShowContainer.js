import React from "react";
import { connect } from "react-redux";
import Sidebar from "../components/Sidebar";
import withAuth from "../hocs/withAuth";
import NewShowForm from "../components/NewShowModal";
import { findDOMNode } from "react-dom";
import $ from "jquery";

class ShowContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newCurrentShow: false,
      tracksClicked: true,
      scenesClicked: false,
      newShowForm: false
    };
  }

  handleNewShow = () => {
    this.setState({ newShowForm: true }, () => this.handleModal());
  };

  // handleModal = () => {
  //   let el = findDOMNode(this.refs.showModal);
  //   $(el).modal("show");
  // };

  changeCurrentShow = () =>
    this.setState({
      newCurrentShow: true,
      tracksClicked: true,
      scenesClicked: false
    });

  currentShowRoles = () => {
    return this.props.currentShow.scene_roles[0].roles.map((r, i) => (
      <div key={i} className="ui message">
        <p>{r.name}</p>
      </div>
    ));
  };

  currentShowScenes = () => {
    return this.props.currentShow.scene_roles[0].scenes.map((s, i) => (
      <div key={i} className="ui message">
        <p>{s.number}</p>
      </div>
    ));
  };

  handleClick = e => {
    switch (e.target.name) {
      case "tracks":
        this.setState({ tracksClicked: true, scenesClicked: false });
        break;
      case "scenes":
        this.setState({ scenesClicked: true, tracksClicked: false });
        break;
      default:
        return null;
    }
  };

  tabMenu = () => {
    return (
      <div>
        <div className="ui top attached tabular menu">
          <a onClick={this.handleClick} name="tracks" className="item">
            Tracks
          </a>
          <a onClick={this.handleClick} name="scenes" className="item">
            Scenes
          </a>
        </div>
        <div className="ui bottom attached active tab segment">
          {this.state.tracksClicked ? this.currentShowRoles() : null}
          {this.state.scenesClicked ? this.currentShowScenes() : null}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="ui grid">
        <div className="three wide column">
          <Sidebar
            handleNewShow={this.handleNewShow}
            changeCurrentShow={this.changeCurrentShow}
            handleLogout={this.props.handleLogout}
          />
        </div>
        <div className="thirteen wide column">
          {this.props.currentShow ? this.tabMenu() : null}
        </div>
        {this.state.newShowForm ? <NewShowForm /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("map state to props", state.currentShow);
  return {
    currentUser: state.currentUser,
    currentShow: state.currentShow
  };
};
export default withAuth(connect(mapStateToProps)(ShowContainer));
