import React from "react";
import { connect } from "react-redux";

const SceneDisplay = (props) => {
  actIIscenes = () => {
    return props.currentShow.scene_roles[0].scenes.actII.map((s, i) => (
      <a key={i} className="ui raised segment scene-card">
        {s.number}
      </a>
    ));
  };

  actIscenes = () => {
    return props.currentShow.scene_roles[0].scenes.actI.map((s, i) => (
      <a key={i} className="ui raised segment scene-card">
        {s.number}
      </a>
    ));
  };

  render() {
    return (
      <div>
        <div className="ui small header">Act I</div>
        <div className="ui floating dropdown">
          {props.currentShow ? actIscenes() : null}
        </div>
        <br />
        <br />
        <br />
        <div className="ui small header">Act II</div>
        <div className="ui floating dropdown">
          {props.currentShow ? actIIscenes() : null}
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

export default connect(mapStateToProps)(SceneDisplay);
