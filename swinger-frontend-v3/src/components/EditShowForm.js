import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { editShow, editRole } from "../adapters";

class EditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTitle: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const tracks = Array.from(
      document.getElementsByClassName("track field")
    ).map(t => ({ name: t.id, change: t.value }));

    this.props.updateShow(null, {
      id: this.props.currentShow.id,
      title: this.state.showTitle
    });
    tracks.forEach(t => {
      editRole(t);
    });
    this.props.changeCurrentShow(this.state.showTitle);
  };

  handleInputChange = e => {
    this.setState({ showTitle: e.target.value });
  };

  deleteTrack = e => {
    console.log(e);
  };

  newTrack = e => {
    e.preventDefault();
    let newIndex = this.state.tracks.length + 1;
    this.setState({ tracks: [...this.state.tracks, { [`${newIndex}`]: "" }] });
  };

  render() {
    console.log(this.state.tracks);
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
                  type="text"
                  name="show-title"
                  placeholder={this.props.currentShow.title}
                />
              </div>
              <div className=" field">
                <label>Tracks</label>
                {this.props.currentShow.scene_roles[0].roles.map((t, i) => (
                  <div key={i} id={i} className="field">
                    <input
                      type="text"
                      id={t.name}
                      className="track field"
                      placeholder={t.name}
                    />
                    <button
                      className="ui mini button"
                      onClick={this.deleteTrack}
                    >
                      remove track
                    </button>
                  </div>
                ))}
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
