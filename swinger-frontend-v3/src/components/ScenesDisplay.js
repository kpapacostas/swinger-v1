import React from "react";
import { connect } from "react-redux";

class SceneDisplay extends React.Component {
  actIIscenes = () => {
    return this.props.currentShow.scene_roles[0].scenes.actII.map((s, i) => (
      <a key={i} className="ui raised segment scene-card">
        {s.number}
      </a>
    ));
  };

  actIscenes = () => {
    return this.props.currentShow.scene_roles[0].scenes.actI.map((s, i) => (
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
          {this.props.currentShow ? this.actIscenes() : null}
        </div>
        <br />
        <br />
        <br />
        <div className="ui small header">Act II</div>
        <div className="ui floating dropdown">
          {this.props.currentShow ? this.actIIscenes() : null}
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
