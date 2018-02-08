import React from "react";
import { connect } from "react-redux";
import { fetchRole } from "../adapters";
import { Stage, Layer, Rect, Text, Image } from "react-konva";
import Konva from "konva";
import StagePlot from "../stagePlot.jpg";

class RoleScenes extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      color: "green"
    };
  }
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };
  render() {
    const divStyle = {
      color: "blue",
      width: "600px",
      height: "600px",
      backgroundImage: `url(${StagePlot})`,
      backgroundSize: "100%",
      backgroundRepeat: "no-repeat"
    };
    return (
      <div>
        <h1>Stage Plot</h1>
        <br />
        <br />
        <br />
        <div style={divStyle}>
          <Stage width={700} height={700} margin={50}>
            <Layer>
              <Rect
                x={10}
                y={10}
                width={20}
                height={20}
                fill={this.state.color}
                shadowBlur={10}
                onClick={this.handleClick}
                draggable={true}
              />
            </Layer>
            <Layer>
              <Rect
                x={10}
                y={10}
                width={20}
                height={20}
                fill={"blue"}
                shadowBlur={10}
                onClick={this.handleClick}
                draggable={true}
              />
            </Layer>
          </Stage>
          <div className={`ui large right fixed vertical menu`}>
            <div
              width="100px"
              height="300px"
              marginRight="0"
              marginLeft="80%"
              class="ui form item"
            >
              <div class="field">
                <label>Notes</label>
                <textarea />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RoleScenes;
