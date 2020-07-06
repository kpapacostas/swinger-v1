import React from "react";
import * as actions from "../actions";
import { createNote, destroyNote } from "../adapters";
import { connect } from "react-redux";
import NoteCard from "./NoteCard";
import { useState, useEffect } from "react";

const NotesBar = ({ handleNote, currentSlide }) => {
  const [newNote, setNewNote] = useState(false);
  const [editDisplay, setEditDisplay] = useState(false);

  const deleteNote = (e) => {
    destroyNote(e.target.id).then((resp) => {
      handleNote(currentSlide.id);
    });
  };

  const addNote = (e) => {
    const currSlide = currentSlide;
    debugger;
    e.preventDefault();
    const noteBody = document.getElementById("note-field").value;
    const slideId = currentSlide.id;
    // console.log("in add note, slideId:", slideId);
    createNote({ body: noteBody, slideId }).then((resp) => {
      handleNote(slideId);
      setNewNote(false);
    });
  };

  const menuStyle = {
    overflow: "scroll",
    width: "25%",
  };

  const noteDisplay = () => {
    if (currentSlide.notes) {
      return currentSlide.notes.map((n, i) => (
        <NoteCard
          key={i}
          note={n}
          editDisplay={editDisplay}
          deleteNote={deleteNote}
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
          {newNote ? (
            <div width="100px" height="300px" className="ui form item">
              <h4>NEW NOTE</h4>
              <textarea placeholder="Note Body" id="note-field" />
              <div onClick={addNote} className="ui tiny basic teal button">
                Save Note
              </div>
              <div
                onClick={() => setNewNote(!newNote)}
                className="ui tiny button"
              >
                Cancel
              </div>
            </div>
          ) : (
            <div className="item">
              <h4>SLIDE NOTES</h4>
              {editDisplay ? (
                <div
                  className="ui tiny teal button"
                  onClick={() => setEditDisplay(!editDisplay)}
                >
                  Done
                </div>
              ) : (
                <div
                  className="ui tiny button"
                  onClick={() => setEditDisplay(!editDisplay)}
                >
                  Edit Notes
                </div>
              )}
              <div
                onClick={() => setNewNote(!newNote)}
                className="ui tiny button"
              >
                <i className="add circle icon" />
                Add Note
              </div>
              {currentSlide ? noteDisplay() : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(null, actions)(NotesBar);
