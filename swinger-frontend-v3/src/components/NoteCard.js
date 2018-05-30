import React from "react";

class NoteCard extends React.Component {
  render() {
    return (
      <div className="ui item">
        {this.props.note.body}
        {this.props.editDisplay ? (
          <i
            id={this.props.note.id}
            onClick={this.props.deleteNote}
            className="ui red minus circle icon"
          />
        ) : null}
      </div>
    );
  }
}

export default NoteCard;
