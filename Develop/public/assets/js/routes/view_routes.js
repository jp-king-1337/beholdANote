const router = require("express").Router();
const path = require("path");
const fs = require("fs");

const dbPath = path.join(__dirname, "../../../db/db.json")

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

// router.post

module.exports = router;
