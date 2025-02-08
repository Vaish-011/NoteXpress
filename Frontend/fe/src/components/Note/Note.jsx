import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Note.css";

const Note = () => {
  const [note, setNote] = useState("");
  const [user, setUser] = useState(null);
  const [noteList, setNoteList] = useState([]);
  const navigate = useNavigate();

  // Check for user authentication and fetch notes
  useEffect(() => {
    const checkAuthAndFetchNotes = async () => {
      try {
        // Check user authentication
        const authResponse = await axios.get("http://localhost:5000/auth-check", { withCredentials: true });
        setUser(authResponse.data.user);

        // Fetch notes
        const noteResponse = await axios.get("http://localhost:5000/note");
        setNoteList(noteResponse.data);
      } catch (err) {
        console.error("Error during authentication or fetching notes", err);
        navigate("/login"); // Redirect to login on error
      }
    };

    checkAuthAndFetchNotes();
  }, [navigate]);

  // Handle submitting a new note
  const submitNote = async () => {
    if (!note.trim()) return;

    try {
      await axios.post("http://localhost:5000/note", { user_id: user, notes: note });
      setNoteList([...noteList, { user_id: user, notes: note, timestamp: new Date().toISOString() }]);
      setNote("");
    } catch (err) {
      console.error("Error submitting note", err);
    }
  };
  // Handle deleting a note
  const deleteNote = async (noteId) => {
    try {
      await axios.delete(`http://localhost:5000/note/${noteId}`);
      setNoteList(noteList.filter((note) => note._id !== noteId));
    } catch (err) {
      console.error("Error deleting note", err);
    }
  };
  

  return (
    <div className="note-container">
      <h2>Notes</h2>

      <div className="note-input">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your note here..."
        />
        <button onClick={submitNote}>Add Note</button>
      </div>

      <div className="note-list">
        {noteList.map((noteItem, index) => (
          <div key={index} className="note-item">
            <p>{noteItem.notes}</p>
            <small>{new Date(noteItem.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <div className="note-list">
        {noteList.map((noteItem) => (
          <div key={noteItem._id} className="note-item">
            <p>{noteItem.notes}</p>
            <small>{new Date(noteItem.timestamp).toLocaleString()}</small>
            <button className="delete-btn" onClick={() => deleteNote(noteItem._id)}>
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Note;
