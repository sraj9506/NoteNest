import React, { useContext,useRef,useEffect,useState } from "react";
import NewNoteContext from "../context/notes/NewNoteContext";

const Modal = (props) => {
  const context = useContext(NewNoteContext);
  const { note,editNote } = context;
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const tagRef = useRef(null);
  const closeModal=useRef(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  useEffect(() => {
    if (note) {
      titleRef.current.value = note.title || '';
      descRef.current.value = note.description || '';
      tagRef.current.value = note.tag || '';
    }
  }, [note]);
  const handleInput = () => {
    const isTitleValid = titleRef.current.value.length >= 5;
    const isDescValid = descRef.current.value.length >= 5;
    if (isButtonDisabled !== (!(isTitleValid && isDescValid)))
      setIsButtonDisabled(!(isTitleValid && isDescValid));
  };
  const handleClick = (e) => {
    e.preventDefault();
    editNote(
      note._id,
      titleRef.current.value,
      descRef.current.value,
      tagRef.current.value
    );
    closeModal.current.click();
    props.showAlert("Note Updated Successfully !","success")
  };
  return (
    <div className="modal fade" tabIndex="-1" id="myModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Note</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={closeModal}
            ></button>
          </div>
          <div className="modal-body">
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
      </form>
          </div>
          <div className="modal-footer justify-content-start">
            <button type="button" className="btn btn-primary" onClick={handleClick} disabled={isButtonDisabled}>
              Update Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};  

export default Modal;
