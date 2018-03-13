import React from "react";

class SlidesBar extends React.Component {
  render() {
    const slideDisplays = () => {
      return this.props.slides.map((s, i) => (
        <div key={i} className="ui item">
          <button
            id={s.number}
            coors={s.coordinates}
            onClick={this.props.handleSlideChange}
            className="ui basic teal button"
          >
            Slide {s.number}
          </button>
        </div>
      ));
    };

    return (
      <div className="ui grid">
        <div className="two wide column" />
        <div className="fourteen wide column">
          <div className={`ui tiny left fixed vertical menu`}>
            <div className="ui item">
              <h4>Slide Display</h4>
              {slideDisplays()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SlidesBar;
