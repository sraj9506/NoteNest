import { useState } from "react";
import NoteContext from "./NoteContext";
import NewNoteContext from "./NewNoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000/";
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState(null);
  const [idToIndexMap, setMap] = useState();
  //Fetch all notes
  const fetchNotes = async () => {
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      const fetchedNotes = data.notes;
      let map = new Map();
      for (let index = 0; index < fetchedNotes.length; index++)
        map.set(fetchedNotes[index]._id, index);
      setMap(map);
      setNotes(fetchedNotes);
    }
  };

  //Add note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    if (response.status === 200) {
      const data = await response.json();
      const note = {
        _id: data._id,
        title,
        description,
        tag,
        date: data.date,
      };
      let map = idToIndexMap;
      map.set(note._id, notes.length);
      setMap(map);
      setNotes(notes.concat(note));
    }
  };

  //Edit note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    if (response.status === 200) {
      const indexToUpdate = idToIndexMap.get(id);
      setNotes((notes) => {
        const updatedNotes = [...notes];
        updatedNotes[indexToUpdate] = {
          ...updatedNotes[indexToUpdate],
          title,
          description,
          tag,
        };
        return updatedNotes;
      });
    }
  };

  //Delete note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    if (response.status === 200) {
      const indexToDelete = idToIndexMap.get(id);
      setNotes((notes) => {
        const updatedNotes = [...notes];
        updatedNotes.splice(indexToDelete, 1);
        return updatedNotes;
      });
      let map = idToIndexMap;
      map.delete(id);
      for (const [key, value] of map) {
        if (value > indexToDelete) {
          map.set(key, value - 1);
        }
      }
      setMap(map);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, fetchNotes, addNote, deleteNote }}>
      <NewNoteContext.Provider value={{ note, setNote, editNote }}>
        {props.children}
      </NewNoteContext.Provider>
    </NoteContext.Provider>
  );
};
export default NoteState;
