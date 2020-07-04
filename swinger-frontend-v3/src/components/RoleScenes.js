import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";
import { createSlide } from "../adapters";
import { useState, useEffect } from "react";

const RoleScenes = ({
  currentRole,
  currentShow,
  slideDisplayView,
  changeRole,
}) => {
  const [actIScenes, setActIScenes] = useState([]);
  const [actIIScenes, setActIIScenes] = useState([]);

  useEffect(() => {
    if (currentRole.scenes) {
      setActIScenes(currentRole.scenes.filter((s) => s.act === 1));
      setActIIScenes(currentRole.scenes.filter((s) => s.act === 2));
    }
  }, []);

  const handleAddScene = () => {
    const actNum = parseInt(document.getElementById("act-number").value, 10);
    const sceneNum = parseInt(
      document.getElementById("scene-number").value,
      10
    );
    const scene = currentShow.scenes.filter((sc) => {
      return sc.act === actNum && sc.number === sceneNum;
    });
    if (scene.length) {
      const data = {
        roleId: currentRole.id,
        sceneId: scene[0].id,
        coordinates: { x: 20, y: 20 },
        number: 1,
      };

      createSlide(data).then((resp) => {
        changeRole(null, currentRole.id);
        setActIScenes(currentRole.scenes.filter((s) => s.act === 1));
        setActIIScenes(currentRole.scenes.filter((s) => s.act === 2));
        document.getElementById("act-number").value = "";
        document.getElementById("scene-number").value = "";
      });
    } else {
      alert(`This show doesn't have an Act ${actNum} Scene ${sceneNum}`);
    }
  };

  const newSceneForm = () => {
    const textStyle1 = {
      color: "teal",
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
          <div onClick={handleAddScene} className="ui mini button">
            <i className="add circle icon" /> Add Scene
          </div>
        </div>
      </div>
    );
  };

  // render() {
  const textStyle = {
    color: "teal",
  };
  const italic = {
    fontStyle: "italic",
    color: "gray",
  };

  if (currentRole.scenes) {
    // setActIScenes(actIScenes.filter((s) => s.act === 1));
    // setActIIScenes(actIIScenes.filter((s) => s.act === 2));
    return (
      <div>
        <br />
        {newSceneForm()}
        <div>
          <br />
          <h3 style={textStyle}>TRACK SCENES</h3>
          <h4>Act I Scenes:</h4>
          {actIScenes.length ? (
            <div>
              {actIScenes.map((s, i) => {
                return (
                  <div
                    onClick={() =>
                      slideDisplayView({
                        id: s.id,
                        act: s.act,
                        number: s.number,
                        slides: s.slides,
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
          {actIIScenes.length ? (
            <div>
              {actIIScenes.map((s, i) => {
                return (
                  <div
                    onClick={() => slideDisplayView({ id: s.id })}
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
        {newSceneForm()}
      </div>
    );
  }
};
// }

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentShow: state.currentShow,
    currentRole: state.currentRole,
    slideDisplay: state.slideDisplay,
  };
};

export default withRouter(connect(mapStateToProps, actions)(RoleScenes));
