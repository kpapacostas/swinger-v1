import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";
import { fetchScene, createSlide } from "../adapters";

class RoleScenes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      actIscenes: [],
      actIIscenes: []
    };
  }

  componentDidMount = () => {
    this.setState({
      actIscenes: this.props.currentRole.scenes.filter(s => s.act === 1),
      actIIscenes: this.props.currentRole.scenes.filter(s => s.act === 2)
    });
  };

  handleAddScene = () => {
    // const scenes = this.props.currentShow.scenes;
    const actNum = parseInt(document.getElementById("act-number").value);
    const sceneNum = parseInt(document.getElementById("scene-number").value);
    const scene = this.props.currentShow.scenes.filter(sc => {
      return sc.act === actNum && sc.number === sceneNum;
    });
    if (scene.length) {
      const data = {
        roleId: this.props.currentRole.id,
        sceneId: scene[0].id,
        coordinates: { x: 20, y: 20 },
        number: 1
      };

      createSlide(data).then(resp => {
        this.props.changeRole(null, this.props.currentRole.id);
        this.setState({
          actIscenes: this.props.currentRole.scenes.filter(s => s.act === 1),
          actIIscenes: this.props.currentRole.scenes.filter(s => s.act === 2)
        });
        document.getElementById("act-number").value = "";
        document.getElementById("scene-number").value = "";
      });
    } else {
      alert(`This show doesn't have an Act ${actNum} Scene ${sceneNum}`);
    }
  };

  newSceneForm = () => {
    const textStyle1 = {
      color: "teal"
    };
    return (
      <div>
        <br />
        <br />
        <div className="ui form">
          <h3 style={textStyle1}>ADD SCENE TO TRACK</h3>
          <div className="five fields">
            <div className="field">
              <label>Act Number:</label>
              <input id="act-number" type="integer" />
            </div>
            <div className="field">
              <label>Scene Number:</label>
              <input id="scene-number" type="integer" />
            </div>
            <br />
          </div>
          <div onClick={this.handleAddScene} className="ui mini button">
            <i className="add circle icon" /> Add Scene
          </div>
        </div>
      </div>
    );
  };

  render() {
    const textStyle = {
      color: "teal"
    };
    const italic = {
      fontStyle: "italic",
      color: "gray"
    };

    if (this.props.currentRole.scenes) {
      const actIscenes = this.state.actIscenes.filter(s => s.act === 1);
      const actIIscenes = this.state.actIIscenes.filter(s => s.act === 2);
      return (
        <div>
          <br />
          {this.newSceneForm()}
          <div>
            <br />
            <h3 style={textStyle}>TRACK SCENES</h3>
            <h4>Act I Scenes:</h4>
            {actIscenes.length ? (
              <div>
                {actIscenes.map((s, i) => {
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
                      className="ui tiny grey basic button"
                    >
                      Scene {s.number}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={italic}>Add scenes above.</div>
            )}
            <h4>Act II Scenes:</h4>
            {actIIscenes.length ? (
              <div>
                {actIIscenes.map((s, i) => {
                  return (
                    <div
                      onClick={() => this.props.slideDisplayView({ id: s.id })}
                      key={i}
                      className="ui tiny grey basic button"
                    >
                      Scene {s.number}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={italic}>Add scenes above.</div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div>
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
