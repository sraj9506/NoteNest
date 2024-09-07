import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import NewNoteContext from "../context/notes/NewNoteContext";

const NoteItem=(props)=> {
  const { _id,title, description,tag } = props.note;
  const context=useContext(NoteContext);
  const newContext=useContext(NewNoteContext);
  const {deleteNote}=context;
  const {setNote}=newContext;
  return (
    <div className="col-md-3 p-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-cemter justify-content-between">
            <h5 className="card-title mb-2">{title}</h5>
            <div className="d-flex">
              <i className="fa-regular fa-pen-to-square mx-3 mt-1" data-bs-toggle="modal" data-bs-target="#myModal" onClick={()=>{setNote({_id,title,description,tag})}}></i>
              <i className="fa-regular fa-trash-can mt-1" onClick={()=>{deleteNote(_id);props.showAlert("Note Deleted Successfully !","success")}}></i>
            </div>
          </div>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
