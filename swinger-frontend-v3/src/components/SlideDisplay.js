import React from "react";
import { connect } from "react-redux";
import { Stage, Layer, Rect } from "react-konva";
import StagePlot from "../stagePlot.jpg";
import NotesBar from "./RightNotesBar";
import SlidesBar from "./LeftSlideBar";
import * as actions from "../actions";

class SlideDisplay extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      color: "green",
      slides: [],
      currentSlide: 0,
      coordinates: {},
      editAlert: false
    };
  }

  componentDidMount() {
    if (this.props.currentSceneDisplay.slides.length) {
      this.setState({
        slides: [...this.props.currentSceneDisplay.slides],
        currentSlide: this.props.currentSceneDisplay.slides[0].number,
        coordinates: this.props.currentSceneDisplay.slides[0].coordinates
      });
    }
  }

  handleDragDrop = e => {
    const newCoordinates = {
      x: e.target._lastPos.x,
      y: e.target._lastPos.y
    };
    this.setState({ coordinates: newCoordinates, editAlert: true });
  };

  handleSave = () => {
    const coors = this.state.coordinates;
    const saveSlide = this.state.slides.find(s => {
      return s.number === `${this.state.currentSlide}`;
    });
    const slideId = saveSlide.id;
    const roleId = this.props.currentRole.id;

    this.props.updateSlide(null, {
      id: slideId,
      role_id: roleId,
      coordinates: coors
    });
  };

  handleCurrentSlide = num => {
    const slide = this.state.slides.find(s => {
      return s.number === num;
    });
    if (slide) {
      this.setState({
        currentSlide: slide.number,
        coordinates: slide.coordinates
      });
    }
  };

  handleSlideChange = e => {
    this.handleCurrentSlide(e.target.id);
  };

  handleNextSlide = e => {
    const num = parseInt(this.state.currentSlide, 10) + 1;
    this.handleCurrentSlide(`${num}`);
  };

  undoMove = () => {};

  createActors = () => {
    const x = this.state.coordinates.x;
    const y = this.state.coordinates.y;
    return (
      <Layer>
        <Rect
          x={x}
          y={y}
          width={20}
          height={20}
          fill={"blue"}
          shadowBlur={10}
          draggable={true}
          onDragEnd={this.handleDragDrop}
        />
      </Layer>
    );
  };

  render() {
    console.log("in slide display", this.props.currentRole);
    const titleStyle = { marginLeft: "17%" };
    const divStyle = {
      color: "blue",
      width: "600px",
      height: "500px",
      backgroundImage: `url(${StagePlot})`,
      marginLeft: "17%",
      padding: "20px",
      backgroundSize: "100%",
      backgroundRepeat: "no-repeat"
    };

    const act = this.props.currentSceneDisplay.act;
    const scene = this.props.currentSceneDisplay.number;

    const editAlert = (
      <div className="ui compact info message">
        Are you sure you want to change this slide?
        <br />
        <button onClick={this.handleSave} className="ui mini button">
          Save
        </button>
        {}
        <button className="ui mini button">Undo</button>
      </div>
    );

    if (this.props.currentSceneDisplay) {
      return (
        <div>
          <SlidesBar
            handleSlideChange={this.handleSlideChange}
            slides={this.state.slides}
          />
          <div style={titleStyle}>
            <h1>
              Act {act}, Scene {scene}
            </h1>
            <br />
            Slide {this.state.currentSlide}
            <br />
            {this.state.editAlert ? (
              editAlert
            ) : (
              <div>
                <br />
                <button
                  onClick={this.handleNextSlide}
                  className="ui mini button"
                >
                  Next Slide <i className="ui angle double right icon" />
                </button>
              </div>
            )}
          </div>
          <br />
          <div style={divStyle}>
            <Stage width={700} height={700} margin={50}>
              {this.state.slides.length ? this.createActors() : null}
            </Stage>
            <NotesBar />
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
    currentShow: state.currentShow,
    currentRole: state.currentRole,
    currentSceneDisplay: state.currentScene
  };
};

export default connect(mapStateToProps, actions)(SlideDisplay);
