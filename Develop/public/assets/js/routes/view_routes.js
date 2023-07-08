const router = require("express").Router();
const path = require("path");

router.get("/notes", (clientReq, serverRes) => {
    serverRes.sendFile(path.join(__dirname, "../../../notes.html"));
});

module.exports = router;