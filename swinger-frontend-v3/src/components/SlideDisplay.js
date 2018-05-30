import React from "react";
import { connect } from "react-redux";
import { Stage, Layer, Rect } from "react-konva";
import StagePlot from "../stagePlot.jpg";
import NotesBar from "./RightNotesBar";
import SlidesBar from "./LeftSlideBar";
import * as actions from "../actions";
import { destroySlide, createSlide, fetchScene, fetchSlide } from "../adapters";
import { withRouter } from "react-router-dom";

class SlideDisplay extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      sceneId: 0,
      slides: [],
      currentSlide: {},
      coordinates: {},
      holdingCoors: {},
      editAlert: false,
      newSlide: false
    };
  }

  componentDidMount() {
    const pathArr = this.props.history.location.pathname.split("/");
    const id = parseInt(pathArr[pathArr.length - 1], 10);
    if (id) {
      fetchScene(id).then(resp => {
        this.setState({
          sceneId: resp.scene.id,
          slides: [...resp.scene.slides],
          currentSlide: resp.scene.slides[0],
          coordinates: resp.scene.slides[0].coordinates
        });
      });
    }
  }
  //SAVE & DELETE SLIDES/////////////////////////////////////////////////////////////////////

  handleSave = () => {
    const coors = this.state.holdingCoors;
    const saveSlide = this.state.slides.find(s => {
      return s.id === this.state.currentSlide.id;
    });
    const slideId = saveSlide.id;
    const roleId = this.props.currentRole.id;

    this.props.updateSlide(null, {
      id: slideId,
      role_id: roleId,
      coordinates: coors
    });
    this.setState({ coordinates: coors, editAlert: false });
  };

  handleSlideDelete = () => {
    const deleteSlide = this.state.slides.find(s => {
      return s.number === `${this.state.currentSlide.number}`;
    });
    const newSlides = this.state.slides.filter(s => {
      return s.id !== deleteSlide.id;
    });
    destroySlide(deleteSlide.id);
    if (newSlides.length) {
      this.setState({
        slides: newSlides,
        currentSlide: newSlides[0],
        coordinates: newSlides[0].coordinates
      });
    } else {
      this.setState({
        coordinates: { x: 20, y: 20 },
        newSlide: true
      });
    }
  };

  //SLIDE CHANGES////////////////////////////////////////////////////////////////////////////
  handleCurrentSlide = num => {
    this.props.fetchCurrentSlide(null, this.state.currentSlide.id);
    const slide = this.state.slides.find(s => {
      return s.number === num;
    });
    if (slide) {
      fetchSlide(slide.id).then(resp => {
        this.setState({
          currentSlide: resp.slide,
          coordinates: resp.slide.coordinates
        });
      });
    }
  };

  handleNote = slideId => {
    fetchSlide(slideId).then(resp => {
      this.setState({
        currentSlide: resp.slide,
        coordinates: resp.slide.coordinates
      });
    });
  };

  handleSlideChange = e => {
    this.handleCurrentSlide(e.target.id);
  };

  handleNextSlide = e => {
    const num = parseInt(this.state.currentSlide.number, 10) + 1;
    this.handleCurrentSlide(`${num}`);
  };

  handleAddSlide = e => {
    this.setState({
      currentSlide: 0,
      coordinates: { x: 20, y: 20 },
      newSlide: true
    });
  };

  //ACTOR MOVES////////////////////////////////////////////////////////////////////////////

  handleDragDrop = e => {
    const newSlideNum =
      parseFloat(this.state.slides[this.state.slides.length - 1].number) +
      parseFloat(1);

    const newCoordinates = {
      x: e.target._lastPos.x,
      y: e.target._lastPos.y
    };

    if (this.state.newSlide) {
      createSlide({
        number: newSlideNum,
        sceneId: this.props.currentSceneDisplay.id,
        roleId: this.props.currentRole.id,
        coordinates: newCoordinates
      }).then(resp =>
        this.setState((prevState, props) => {
          return {
            slides: [
              ...this.state.slides,
              {
                number: newSlideNum,
                coordinates: newCoordinates
              }
            ],
            currentSlide: {
              number: newSlideNum,
              sceneId: this.props.currentSceneDisplay.id,
              roleId: this.props.currentRole.id,
              coordinates: newCoordinates
            },
            coordinates: newCoordinates,
            newSlide: false
          };
        })
      );
    } else {
      this.setState({ holdingCoors: newCoordinates, editAlert: true });
    }
  };

  undoMove = e => {
    this.setState({ editAlert: false });
  };

  createActors = () => {
    const x = this.state.editAlert
      ? this.state.holdingCoors.x
      : this.state.coordinates.x;
    const y = this.state.editAlert
      ? this.state.holdingCoors.y
      : this.state.coordinates.y;
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
    const titleStyle = { marginLeft: "17%" };
    const headerStyle = { color: "teal" };
    const deleteStyle = { marginLeft: "42%" };
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
    const slides = this.state.slides.sort((s1, s2) => {
      return s1.number - s2.number;
    });

    const editAlert = (
      <div className="ui compact info message">
        Are you sure you want to change this slide?
        <br />
        <button onClick={this.handleSave} className="ui mini button">
          Save
        </button>
        {}
        <button onClick={this.undoMove} className="ui mini button">
          Undo
        </button>
      </div>
    );

    if (this.props.currentSceneDisplay) {
      return (
        <div>
          <SlidesBar
            handleSlideChange={this.handleSlideChange}
            slides={slides}
            handleAddSlide={this.handleAddSlide}
          />
          <div style={titleStyle}>
            <h1 style={headerStyle}>
              ACT {act} SCENE {scene}
            </h1>
            {this.state.newSlide ? (
              <div className="ui compact info message">
                Choose location of your role for this slide
              </div>
            ) : (
              <h3>Slide {this.state.currentSlide.number}</h3>
            )}
            {this.state.editAlert ? (
              editAlert
            ) : (
              <div>
                <button
                  onClick={this.handleNextSlide}
                  className="ui mini button"
                >
                  Next Slide <i className="ui angle double right icon" />
                </button>
                <button
                  style={deleteStyle}
                  onClick={this.handleSlideDelete}
                  className="ui mini basic red button"
                >
                  Delete Slide
                </button>
              </div>
            )}
          </div>
          <br />
          <div style={divStyle}>
            <Stage width={700} height={700} margin={50}>
              {this.state.slides.length ? this.createActors() : null}
            </Stage>
            <NotesBar
              currentSlide={this.state.currentSlide}
              handleNote={this.handleNote}
            />
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
    currentSlide: state.currentSlide,
    currentSceneDisplay: state.currentScene
  };
};

export default withRouter(connect(mapStateToProps, actions)(SlideDisplay));
