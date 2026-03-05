// server ko create karna //

const express = require("express");
const noteModel = require("./models/note.model");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "./public")))
app.use(express.static("./public"))





// Post/api/notes //
// create a new note and save data in mongodb //
// req.body = {title , description} //


app.post("/api/notes", async (req, res) => {
    const {title, description} = req.body;

     const note = await noteModel.create({
        title,
        description
    })

    res.status(201).json({
        message: "note created successfully",
        note
    })
})


// GET API/NOTES //
// FETCH ALL THE NOTES FROM MONGODB ANC SEND THEM IN RESPONSE //

app.get("/api/notes", async (req, res) => {
    const notes = await noteModel.find();

    res.status(200).json({
        message: "notes fetched successfully",
        notes
    })
})

// Delete api/notes/:id //
// delete a note from mongodb based on id //

app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id;

    await noteModel.findByIdAndDelete(id);

    res.status(200).json({
        message: "note deleted successfully"
    })
})

//Patch api/notes/:id //
// update a note in mongodb based on id //
// req.body = {description} //

app.patch("/api/notes/:id", async (req, res) => {
    const id = req.params.id;
    const { description } = req.body;

   await noteModel.findByIdAndUpdate(id, { description })

   res.status(200).json({
    message: "note updated successfully"
   })

})
 
console.log(__dirname)


app.use('*name', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "./public/index.html"))
})

module.exports = app;
 