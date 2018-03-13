import React from "react";
import NoteDisplay from "./NoteDisplay";

class NotesBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      currentNote: {}
    };
  }

  handleNoteClick = e => {
    const notes = this.state.notes;
    const note = notes.filter(n => n.title === e.target.id);
    this.setState({ currentNote: note });
  };

  addNote = e => {
    e.preventDefault();
    this.setState(
      {
        notes: [
          ...this.state.notes,
          {
            title: document.getElementById("note-title").value,
            body: document.getElementById("note-field").value
          }
        ]
      },
      () => {
        document.getElementById("note-title").value = "";
        document.getElementById("note-field").value = "";
      }
    );
  };

  render() {
    return (
      <div className="ui grid">
        <div className="ten wide column" />
        <div className="two wide column">{<NoteDisplay />}</div>
        <div className="four wide column">
          <div className={`ui large right fixed vertical menu`}>
            <div width="100px" height="300px" className="ui form item">
              <div className="field">
                <label>New Note</label>
                <input placeholder="Note Title" id="note-title" />
                <textarea placeholder="Note Body" id="note-field" />
                <div onClick={this.addNote} className="ui tiny teal button">
                  Save Note
                </div>
              </div>
            </div>
            {this.state.notes.length ? (
              <div>
                <div className="ui medium header item">Slide Notes</div>
                <div className="ui vertical fluid right tabular menu">
                  {this.state.notes.map((n, i) => (
                    <a
                      key={i}
                      id={n.title}
                      onClick={this.handleNoteClick}
                      className="item"
                    >
                      {n.title}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default NotesBar;

// <div className="four wide column">
//   <div className="ui segment">
//     {!!this.state.currentNote.length
//       ? (document.getElementById(
//         `${this.state.currentNote[0].title}`
//       ).innerHTML = this.state.currentNote[0].body)
//       : null}
//     </div>
//   </div>
