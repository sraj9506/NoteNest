import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

function Notes(props) {
  const context = useContext(NoteContext);
  const { notes, fetchNotes } = context;
  const navigate=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token'))
    fetchNotes();
    else
    navigate('/Login');
    //eslint-disable-next-line
  }, []);
  return (
    <div className="mt-3">
      <Modal showAlert={props.showAlert}/>
      <h1>Your Notes</h1>
      {notes.length===0&&<div className="ms-1 fs-5">No Notes Found !</div>}
      <div className="row">
        {notes.map(note =><NoteItem note={note}key={note._id} showAlert={props.showAlert}/>)}
      </div>
    </div>
  );
}

export default Notes;
