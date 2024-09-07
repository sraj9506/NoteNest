import React, { useContext, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

function AddNote(props) {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const tagRef = useRef(null);
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const handleInput = () => {
    const isTitleValid = titleRef.current.value.length >= 5;
    const isDescValid = descRef.current.value.length >= 5;
    if (isButtonDisabled !== (!(isTitleValid && isDescValid)))
      setIsButtonDisabled(!(isTitleValid && isDescValid));
  };
  const handleClick = (e) => {
    e.preventDefault();
    addNote(
      titleRef.current.value,
      descRef.current.value,
      tagRef.current.value,
    );
    props.showAlert("Note Added Successfully !","success")
  };
  return (
    <div className="mt-5 pt-4">
      <h1>Add a Note</h1>
      <form>
        <div className="my-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            ref={titleRef}
            onChange={handleInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            ref={descRef}
            onChange={handleInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            ref={tagRef}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
          disabled={isButtonDisabled}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
