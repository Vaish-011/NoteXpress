import React, { useState } from "react";
import { Trash2 } from "lucide-react"; // Importing the delete icon
import "./Note.css";

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  // Open modal to add a note
  const handleAddNote = () => {
    setShowModal(true);
  };

  // Save note and add it to the top
  const handleSaveNote = () => {
    if (newNote.trim() !== "") {
      setNotes((prevNotes) => [{ text: newNote }, ...prevNotes]); // Add new note at the top
      setNewNote("");
      setShowModal(false);
    }
  };

  // Delete note
  const handleDeleteNote = (index) => {
    setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <div className="notes-container">
        {notes.map((note, index) => (
          <div key={index} className="note-box">
            <p
              onClick={() => setSelectedNote(note.text)}
              style={{ flexGrow: 1, cursor: "pointer" }}
            >
              {note.text.length > 50 ? note.text.substring(0, 50) + "..." : note.text}
            </p>
            <button className="delete-button" onClick={() => handleDeleteNote(index)}>
              <Trash2 size={20} color="white" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <div className="add-button-container">
        <button className="add-button" onClick={handleAddNote}>+</button>
      </div>

      {/* Modal for Adding Note */}
      {showModal && (
        <div className="modal">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write your note here..."
          ></textarea>
          <button className="save-button" onClick={handleSaveNote}>Save</button>
          <button className="close-button" onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}

      {/* Modal for Viewing Full Note */}
      {selectedNote && (
        <div className="modal">
          <p>{selectedNote}</p>
          <button className="close-button" onClick={() => setSelectedNote(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Note;
