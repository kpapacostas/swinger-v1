import React from "react";
import { connect } from "react-redux";
import Sidebar from "../components/Sidebar";
import withAuth from "../hocs/withAuth";
import NewShowForm from "../components/NewShowForm";
import EditForm from "../components/EditShowForm";
import { withRouter } from "react-router-dom";
import RolesDisplay from "../components/RolesDisplay";
import RoleScenes from "../components/RoleScenes";
import dancingGif from "../dancingGif.gif";
import * as actions from "../actions";
// import { destroyShow } from "../adapters";

class ShowContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newShowForm: false,
      editShowForm: false,
      roleDisplay: false,
    };
  }

  changeCurrentShow = (showTitle) => {
    this.setState({
      newShowForm: false,
      editShowForm: false,
      roleDisplay: false,
    });
    this.props.fetchCurrentShow(null, showTitle);
  };

  changeRoleDisplay = () => {
    this.setState({
      newShowForm: false,
      editShowForm: false,
      roleDisplay: true,
    });
  };

  deleteShow = () => {
    this.props.deleteShow(this.props.currentShow.id);
    this.setState({ editShowForm: false });
  };

  handleShowForm = (e) => {
    switch (e.target.id) {
      case "new":
        this.setState({
          newShowForm: true,
          editShowForm: false,
        });
        break;
      case "edit":
        this.setState({
          newShowForm: false,
          editShowForm: true,
        });
        break;
      default:
        return null;
    }
  };

  tabMenu = () => {
    return (
      <div className="">
        <br />
        <h3>{this.props.currentShow.title}</h3>
        <div className="ui small buttons">
          <button id="edit" onClick={this.handleShowForm} className="ui button">
            Edit
          </button>
          <div className="or" />
          <button onClick={this.deleteShow} id="delete" className="ui button">
            Delete
          </button>
        </div>
        <br />
        <br />
        <div className="segment">
          <div className="">
            <h4>Tracks</h4>
            <RolesDisplay changeRoleDisplay={this.changeRoleDisplay} />
          </div>
        </div>
      </div>
    );
  };

  slideDisplayView = (data) => {
    this.props.currentScene(data);
    this.setState(
      {
        deletedShow: false,
        newShowForm: false,
        editShowForm: false,
        roleDisplay: false,
      },
      () => this.props.history.push(`/slidedisplay/${data.id}`)
    );
  };

  render() {
    console.log("in show container", this.props.currentShow);
    const divStyle = {
      display: "block",
      width: "400px",
      height: "200px",
      backgroundImage: `url(${dancingGif})`,
      textAlign: "center",
      marginLeft: "auto",
      marginRight: "50%",
      marginTop: "15%",
      shadowBlur: "100px",
      backgroundSize: "100%",
      backgroundRepeat: "no-repeat",
    };
    return (
      <div className="ui grid">
        <div className="three wide column">
          <Sidebar
            handleNewShow={this.handleShowForm}
            changeCurrentShow={this.changeCurrentShow}
            handleLogout={this.props.handleLogout}
          />
        </div>
        <div className="thirteen wide column">
          {!this.props.currentShow &&
          !this.state.newShowForm &&
          !this.state.editShowForm &&
          !this.state.roleDisplay ? (
            <div>
              <div style={divStyle}>
                <br />
                <h2>Choose a show to work on!</h2>
                <i className="chevron left icon" />
                <i className="chevron left icon" />
                <i className="chevron left icon" />
              </div>
            </div>
          ) : null}
          {this.props.currentShow &&
          !this.state.newShowForm &&
          !this.state.editShowForm &&
          !this.state.roleDisplay
            ? this.tabMenu()
            : null}
          {this.state.newShowForm ? (
            <NewShowForm changeCurrentShow={this.changeCurrentShow} />
          ) : null}
          {this.state.editShowForm ? (
            <EditForm changeCurrentShow={this.changeCurrentShow} />
          ) : null}
          {!!this.props.currentRole && this.state.roleDisplay ? (
            <RoleScenes slideDisplayView={this.slideDisplayView} />
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("show container state", state);
  return {
    currentUser: state.currentUser,
    currentShow: state.currentShow,
    currentRole: state.currentRole,
    slideDisplay: state.slideDisplay,
  };
};
export default withRouter(
  withAuth(connect(mapStateToProps, actions)(ShowContainer))
);
