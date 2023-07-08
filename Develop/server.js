const express = require("express");

const app = express();
const PORT = process.env.PORT || 3333;
const view_routes = require("./public/assets/js/routes/view_routes")

// Middleware
app.use(express.static("public"));
app.use(express.json());

// Routes
app.use("/", [
    view_routes
]);

// Start the sever
app.listen(PORT, () => console.log("Server started on port %s", PORT));