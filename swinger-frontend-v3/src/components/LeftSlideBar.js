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
              <h4>SLIDES</h4>
            </div>
            <div
              onClick={this.props.handleAddSlide}
              className="ui mini button full"
              href=""
            >
              <i className="add circle icon" />
              Add Slide
            </div>
            {slideDisplays()}
          </div>
        </div>
      </div>
    );
  }
}

export default SlidesBar;
