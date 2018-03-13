import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { editRole, createRole } from "../adapters";

class EditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTitle: "",
      tracks: [],
      newTracks: []
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const newTracks = this.state.newTracks.map((t, i) => ({
      name: this.state.newTracks[i],
      showId: this.props.currentShow.id
    }));

    newTracks.forEach(t => {
      createRole(t.name, t.showId);
    });

    const tracks = this.state.tracks.map((t, i) => ({
      name: t.name,
      change: t.change,
      show: this.props.currentShow.id
    }));
    tracks.forEach(t => {
      editRole(t);
    });

    this.props.updateShow(null, {
      id: this.props.currentShow.id,
      title: this.state.showTitle
    });

    this.props.changeCurrentShow(this.props.currentShow.title);
  };

  handleInputChange = e => {
    switch (e.target.name) {
      case "show-title":
        this.setState({ showTitle: e.target.value });
        break;
      case "oldTrack":
        let tracks = this.state.tracks;
        let index = e.target.parentElement.id;
        this.setState({
          tracks: [
            ...tracks.slice(0, index),
            (tracks[index] = { name: e.target.id, change: e.target.value }),
            ...this.state.tracks.slice(index + 1)
          ]
        });
        break;
      case "newTrack":
        let newTracks = this.state.newTracks;
        let newIndex = e.target.parentElement.id;
        this.setState({
          newTracks: [
            ...newTracks.slice(0, newIndex),
            (newTracks[newIndex] = e.target.value),
            ...newTracks.slice(newIndex + 1)
          ]
        });
        break;
      default:
        return null;
    }
  };

  deleteTrack = e => {
    e.preventDefault();
    this.props.deleteRole(null, parseInt(e.target.id, 10));
  };

  newTrack = e => {
    e.preventDefault();
    this.setState({
      newTracks: [...this.state.newTracks, { "no name": "" }]
    });
  };

  render() {
    if (this.props.currentShow) {
      return (
        <div className="ui grid">
          <div className="row">
            <form
              onSubmit={this.handleSubmit}
              className="ui equal width form showForm"
            >
              <br />
              <div className="ui form header">Edit Show Info</div>
              <div className="field">
                <label>Show Title</label>
                <input
                  id={this.props.currentShow.id}
                  onChange={this.handleInputChange}
                  name="show-title"
                  placeholder={this.props.currentShow.title}
                />
              </div>
              <div className=" field">
                <label>Current Tracks</label>
                {this.props.currentShow.scene_roles[0].roles.map((r, i) => (
                  <div key={i} id={i} className="field">
                    <input
                      id={r.name}
                      onChange={this.handleInputChange}
                      name="oldTrack"
                      className="track field"
                      placeholder={r.name}
                    />
                    <button
                      id={r.id}
                      className="ui mini button"
                      onClick={this.deleteTrack}
                    >
                      remove track
                    </button>
                  </div>
                ))}
                {this.state.newTracks.length ? <label>New Tracks</label> : null}
                <div>
                  {this.state.newTracks.map((t, i) => (
                    <div key={i} id={i} className="track field">
                      <input
                        onChange={this.handleInputChange}
                        type="text"
                        name="newTrack"
                        placeholder="Role Name"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <br />
              <button onClick={this.newTrack} className="ui small button ">
                <i className="add circle icon" />
                Add Track
              </button>
              <br />
              <br />
              <br />
              <button className="ui teal button" type="submit">
                Submit Changes
              </button>
            </form>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    currentShow: state.currentShow
  };
};

export default connect(mapStateToProps, actions)(EditForm);
