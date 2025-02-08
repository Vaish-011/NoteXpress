import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Note.css";

const Note = () => {
  const [note, setNote] = useState("");
  const [user, setUser] = useState(null);
  const [noteList, setNoteList] = useState([]);
  const navigate = useNavigate();

 
  useEffect(() => {
    const checkAuthAndFetchNotes = async () => {
      try {
       
        const authResponse = await axios.get("http://localhost:5000/auth-check", { withCredentials: true });
        setUser(authResponse.data.user);

        const noteResponse = await axios.get("http://localhost:5000/note");
        setNoteList(noteResponse.data);
      } catch (err) {
        console.error("Error during authentication or fetching notes", err);
        navigate("/login"); 
      }
    };

    checkAuthAndFetchNotes();
  }, [navigate]);

  
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
  
  const deleteNote = async (noteId) => {
    try {
      await axios.delete(`http://localhost:5000/note/${noteId}`);
      setNoteList(noteList.filter((note) => note._id !== noteId));
    } catch (err) {
      console.error("Error deleting note", err);
    }
  };
  

  return (
    <div className="notes-container">
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
        {noteList.map((noteItem) => (
          <div key={noteItem._id} className="note-item">
            <p>{noteItem.notes}</p>
            <small>{new Date(noteItem.timestamp).toLocaleString()}</small>
            <button className="delete-button" onClick={() => deleteNote(noteItem._id)}>
              <MdDelete size={18} color="white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Note;
