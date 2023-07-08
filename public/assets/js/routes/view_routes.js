const router = require("express").Router();

const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const dbPath = path.join(__dirname, "../../../../db/db.json")

// HTML routes
// Module 11 on BCS says that "GET * should return the index.html file." but the asterisk just breaks the button. With * on line 5, the button directs to index.html. With / on line 5, the button works properly along with clicks on the Note Taker in the nav bar. So I'm leaving it as / instead of *.
router.get("/", (clientReq, serverRes) => {
    serverRes.sendFile(path.join(__dirname, "../../../index.html"));
});

router.get("/notes", (clientReq, serverRes) => {
    serverRes.sendFile(path.join(__dirname, "../../../notes.html"));
});

// API routes
router.get("/api/notes", (clientReq, serverRes) => {
    fs.readFile(dbPath, "utf8", (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data);

        serverRes.json(notes);
    });
});

router.post("/api/notes", (clientReq, serverRes) => {
    fs.readFile(dbPath, "utf8", (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data);

        const newNote = clientReq.body;
        newNote.id = uuidv4()

        notes.push(newNote);

        fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
            if (err) throw err;

            console.log("New note has been saved.");

            serverRes.json(newNote);
        });
    });
});

// Delete route
router.delete("/api/notes/:id", (clientReq, serverRes) => {
    const noteId = clientReq.params.id;

    fs.readFile(dbPath, "utf8", (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data);

        // Need to find the note with the given id
        const noteIndex = notes.findIndex((note) => note.id === noteId);

        notes.splice(noteIndex, 1);
        // I think splice will work to delete? If I splice it at 1 it should take away every part of the selected note

        fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
            if (err) throw err;

            console.log("Note has been deleted.");

            serverRes.sendStatus(204);
        })
    })
})

module.exports = router;
