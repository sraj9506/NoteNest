const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");
const router = express.Router();

//Route 1 : get all the notes. using GET : "/api/auth/fetchallnotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id }, "-user -__v");
    res.json({ notes });
  } catch (error) {
    res.status(500).json({ error: "Internal server error !" });
  }
});

//Route 2 : Add a new note. using POST : "/api/auth/addnote"
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title must have at least 3 characters !").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description must have at least 5 characters !"
    ).isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //Check whether paramters are valid or not.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Adding a new note.
    const { title, description, tag } = req.body;
    try {
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const newNote = await note.save();
      res.json({ _id: newNote._id, date: newNote.date });
    } catch (error) {
      res.status(500).json({ error: "Internal server error !" });
    }
  }
);

//Route 3 : Update a note. using PUT : "/api/auth/updatenote"
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag, date } = req.body;
  //New note object.
  const newNote = {};
  newNote.title = title;
  newNote.description = description;
  newNote.tag = tag;
  //Find the note.
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(400).send("Note Not found !");
    }
    //Test of unauthorized access.
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not allowed !" });
    }
    //Updating a note.
    await note.updateOne(
      { title: title, description: description, tag: tag, date: date },
      { new: true }
    );
    res.json({ message: "Note updated successfully !" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error !" });
  }
});

//Route 4 : Delete a note. using DELETE : "/api/auth/deletenote"
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  //Find the note.
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(400).send("Note Not found !");
    }
    //Test of unauthorized access.
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not allowed !" });
    }
    //Deleting a note.
    await note.deleteOne();
    res.send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error !" });
  }
});

module.exports = router;