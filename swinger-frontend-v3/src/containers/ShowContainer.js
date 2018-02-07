import React from "react";
import { connect } from "react-redux";
import Sidebar from "../components/Sidebar";
import withAuth from "../hocs/withAuth";
import NewShowForm from "../components/NewShowForm";
import SceneDisplay from "../components/ScenesDisplay";
import EditForm from "../components/EditShowForm";
import { withRouter } from "react-router-dom";
import RoleDisplay from "../components/RolesDisplay";

class ShowContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newShowForm: false,
      editShowForm: false
    };
  }

  changeCurrentShow = showTitle => {
    this.setState(
      {
        newShowForm: false,
        editShowForm: false
      },
      () => this.props.fetchCurrentShow(null, showTitle)
    );
  };

  deleteShow = () => {
    this.props.deleteShow(null, this.props.currentShow.id);
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
            {<RoleDisplay />}
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
          {this.props.currentShow &&
          !this.state.newShowForm &&
          !this.state.editShowForm
            ? this.tabMenu()
            : null}
          {this.state.newShowForm ? (
            <NewShowForm changeCurrentShow={this.changeCurrentShow} />
          ) : null}
          {this.state.editShowForm ? (
            <EditForm changeCurrentShow={this.changeCurrentShow} />
          ) : null}
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
