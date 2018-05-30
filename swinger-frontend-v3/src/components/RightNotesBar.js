import React from "react";
import * as actions from "../actions";
import { createNote, destroyNote } from "../adapters";
import { connect } from "react-redux";
import NoteCard from "./NoteCard";

class NotesBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newNote: false,
      editDisplay: false
    };
  }

  newNote = () => {
    this.setState({ newNote: !this.state.newNote });
  };

  editNotes = () => {
    this.setState({ editDisplay: !this.state.editDisplay });
  };

  deleteNote = e => {
    destroyNote(e.target.id).then(resp => {
      this.props.handleNote(this.props.currentSlide.id);
    });
  };

  addNote = e => {
    const currSlide = this.props.currentSlide;
    debugger;
    e.preventDefault();
    const noteBody = document.getElementById("note-field").value;
    const slideId = this.props.currentSlide.id;
    // console.log("in add note, slideId:", slideId);
    createNote({ body: noteBody, slideId }).then(resp => {
      this.props.handleNote(slideId);
      this.setState({ newNote: false });
    });
  };

  render() {
    const menuStyle = {
      overflow: "scroll",
      width: "25%"
    };

    const noteDisplay = () => {
      if (this.props.currentSlide.notes) {
        return this.props.currentSlide.notes.map((n, i) => (
          <NoteCard
            key={i}
            note={n}
            editDisplay={this.state.editDisplay}
            deleteNote={this.deleteNote}
          />
        ));
      }
    };

    return (
      <div className="ui grid">
        <div className="five wide column">
          <div
            id="note-list"
            style={menuStyle}
            className={`ui large right fixed vertical menu`}
          >
            {this.state.newNote ? (
              <div width="100px" height="300px" className="ui form item">
                <h4>NEW NOTE</h4>
                <textarea placeholder="Note Body" id="note-field" />
                <div
                  onClick={this.addNote}
                  className="ui tiny basic teal button"
                >
                  Save Note
                </div>
                <div onClick={this.newNote} className="ui tiny button">
                  Cancel
                </div>
              </div>
            ) : (
              <div className="item">
                <h4>SLIDE NOTES</h4>
                {this.state.editDisplay ? (
                  <div className="ui tiny teal button" onClick={this.editNotes}>
                    Done
                  </div>
                ) : (
                  <div className="ui tiny button" onClick={this.editNotes}>
                    Edit Notes
                  </div>
                )}
                <div onClick={this.newNote} className="ui tiny button">
                  <i className="add circle icon" />
                  Add Note
                </div>
                {this.props.currentSlide ? noteDisplay() : null}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(NotesBar);
