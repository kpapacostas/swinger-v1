import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";

class RoleScenes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scenes: []
    };
  }

  newSceneForm = () => {
    return (
      <div className="ui segment">
        <form>
          Add Scene To Track
          <br />
          <div className="ui horizontal fields">
            <div className="field">
              <label>Act:</label>
              <br />
              <input placeholder="Act Number" />
            </div>
            <div className="field">
              <label>Scene:</label>
              <br />
              <input placeholder="Scene Number" />
            </div>
          </div>
        </form>
      </div>
    );
  };

  render() {
    if (this.props.currentRole.scenes) {
      return (
        <div>
          <br />
          <br />
          <br />
          <div className="ui segment">
            Current Scenes
            <br />
            <br />
            {this.props.currentRole.scenes.map((s, i) => {
              return (
                <div
                  onClick={() =>
                    this.props.slideDisplayView({
                      id: s.id,
                      act: s.act,
                      number: s.number,
                      slides: s.slides
                    })
                  }
                  key={i}
                  className="ui tiny teal basic button"
                >
                  Scene {s.number}
                </div>
              );
            })}
          </div>
          <br />
          <br />
          {this.newSceneForm()}
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <br />
          <br />
          {this.newSceneForm()}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    currentShow: state.currentShow,
    currentRole: state.currentRole,
    slideDisplay: state.slideDisplay
  };
};

export default withRouter(connect(mapStateToProps, actions)(RoleScenes));
