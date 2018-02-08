import React from "react";
import { createShow, createRole, createScene } from "../adapters";
import { connect } from "react-redux";
import * as actions from "../actions";

class NewShowForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTitle: "",
      actI: 0,
      actII: 0,
      tracks: [{ 0: "" }]
    };
  }

  actIScenes = showId => {
    let i = 1;
    while (i <= this.state.actI) {
      createScene(i, 1, showId);
      i++;
    }
  };

  actIIScenes = showId => {
    let i = 1;
    while (i <= this.state.actII) {
      createScene(i, 2, showId);
      i++;
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    createShow(this.state.showTitle, this.props.currentUser.id).then(json => {
      this.state.tracks.forEach(t => {
        if(this.state.tracks[t] !== ""){
        return createRole(t, json.id);
        }else {
        return null
      }
      });
      this.actIScenes(json.id);
      this.actIIScenes(json.id);
      this.props.fetchUser();
      this.props.changeCurrentShow(json.title);
    });
  };

  handleInputChange = e => {
    switch (e.target.name) {
      case "show-title":
        this.setState({ showTitle: e.target.value });
        break;
      case "actI":
        this.setState({ actI: parseInt(e.target.value, 10) });
        break;
      case "actII":
        this.setState({ actII: parseInt(e.target.value, 10) });
        break;
      case "track":
        let tracks = this.state.tracks;
        let index = e.target.parentElement.id;
        this.setState({
          tracks: [
            ...tracks.slice(0, index),
            (tracks[index] = e.target.value),
            ...this.state.tracks.slice(index + 1)
          ]
        });
        break;
      default:
        return null;
    }
  };

  deleteTrack = (e) => {
    e.preventDefault()
    let tracks = this.state.tracks;
    let index = e.target.id;
    this.setState({
      tracks: [
        ...tracks.slice(0, index),
        ...this.state.tracks.slice(index + 1)
      ]
    })
  }


  newTrack = e => {
    e.preventDefault();
    let newIndex = this.state.tracks.length + 1;
    this.setState({ tracks: [...this.state.tracks, { [`${newIndex}`]: "" }] });
  };

  render() {
    return (
      <div className="ui grid">
        <div className="row">
          <form
            onSubmit={this.handleSubmit}
            className="ui equal width form showForm"
          >
            <br />
            <div className="ui form header"> New Show Info</div>
            <div className="field">
              <label>Show Title</label>
              <input
                onChange={this.handleInputChange}
                type="text"
                name="show-title"
                placeholder="Show Title"
              />
            </div>
            <div className="fields">
              <div className="field">
                <label>Act I</label>
                <input
                  onChange={this.handleInputChange}
                  type="text"
                  name="actI"
                  placeholder="# of scenes"
                />
              </div>
              <div className="field">
                <label>Act II</label>
                <input
                  onChange={this.handleInputChange}
                  type="text"
                  name="actII"
                  placeholder="# of scenes"
                />
              </div>
            </div>
            <div className=" field">
              <label>Tracks</label>
              {this.state.tracks.map((t, i) => (
                <div key={i} id={i} className="field">
                  <input
                    onChange={this.handleInputChange}
                    type="text"
                    name="track"
                    placeholder="Role Name"
                  />
                  <button
                    id={i}
                    className="ui mini button"
                    onClick={this.deleteTrack}
                  >
                    <i className="minus square icon"></i>
                  </button>
                </div>
              ))}
            </div>
            <button onClick={this.newTrack} className="ui small button ">
              <i className="add circle icon" />
              Add Track
            </button>
            <br />
            <br />
            <br />
            <button className="ui teal button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps, actions)(NewShowForm);
