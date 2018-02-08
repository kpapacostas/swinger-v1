import React from "react";
import { connect } from "react-redux";
import Sidebar from "../components/Sidebar";
import withAuth from "../hocs/withAuth";
import NewShowForm from "../components/NewShowForm";
import SceneDisplay from "../components/ScenesDisplay";
import EditForm from "../components/EditShowForm";
import { withRouter } from "react-router-dom";
import RoleDisplay from "../components/RolesDisplay";
import RoleScenes from "../components/RoleDisplay";
import { fetchRole } from "../adapters";
import SlideDisplay from "../components/SlideDisplay";

class ShowContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newShowForm: false,
      editShowForm: false,
      deletedShow: false,
      roleDisplay: false,
      currentRole: 0,
      roleScenes: [],
      slideDisplay: false
    };
  }

  changeCurrentShow = showTitle => {
    this.setState(
      {
        newShowForm: false,
        editShowForm:false, 
        currentRole: 0,
        slideDisplay: false
      },
      () => this.props.fetchCurrentShow(null, showTitle)
    );
  };

  deleteShow = () => {
    this.setState({ editShowForm: false });
    this.props.deleteShow(null, this.props.currentShow.id);
  };

  displayRoleScenes = e => {
    let id = e.target.id;
    if (id) {
      fetchRole(id).then(resp => {
        console.log("in display roles", resp);
        if (resp.role.scenes.length) {
          this.setState({
            currentRole: id,
            roleScenes: resp.role.scenes
          });
        } else {
          this.setState({ currentRole: id, roleScenes: [] });
        }
      });
    } else {
      return null;
    }
  };

  displaySlides = () => {
    this.setState({ slideDisplay: true, currentRole: 0 });
  };

  handleShowForm = e => {
    switch (e.target.id) {
      case "new":
        this.setState({
          newShowForm: true,
          editShowForm: false
        });
        break;
      case "edit":
        this.setState({
          newShowForm: false,
          editShowForm: true
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
            <RoleDisplay displayRoleScenes={this.displayRoleScenes} />
          </div>
          <br />
          <br />
          <div className="">
            <h4>Scenes</h4>
            {<SceneDisplay />}
          </div>
        </div>
      </div>
    );
  };

  render() {
    console.log("current role id", this.state.currentRole);
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
          {!this.props.currentShow && !this.state.newShowForm ? (
            <div>
              <br />
              <br />
              <br />
              <div className="ui center aligned middle aligned stacked segment container-segment">
                <h2>Choose a show to work on!</h2>
              </div>
            </div>
          ) : null}
          {this.props.currentShow &&
          !this.state.newShowForm &&
          !this.state.editShowForm &&
          this.state.currentRole === 0 &&
          !this.state.slideDisplay
            ? this.tabMenu()
            : null}
          {this.state.newShowForm ? (
            <NewShowForm changeCurrentShow={this.changeCurrentShow} />
          ) : null}
          {this.state.editShowForm ? (
            <EditForm changeCurrentShow={this.changeCurrentShow} />
          ) : null}
          {this.props.currentShow && this.state.currentRole !== 0 ? (
            <RoleScenes
              displaySlides={this.displaySlides}
              currentRole={this.state.currentRole}
              roleScenes={this.state.roleScenes}
              id={this.state.currentRole}
            />
          ) : null}
          {this.state.slideDisplay ? <SlideDisplay /> : null}
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
export default withRouter(withAuth(connect(mapStateToProps)(ShowContainer)));
