const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample database (temporary)
let users = [];
let wasteReports = [];

// 🔹 Test Route
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

// 🔹 Register User
app.post("/register", (req, res) => {
    const { name, email } = req.body;

    const user = { id: users.length + 1, name, email };
    users.push(user);

    res.json({ message: "User registered successfully", user });
});

// 🔹 Submit Waste Report
app.post("/report", (req, res) => {
    const { location, wasteType, description } = req.body;

    const report = {
        id: wasteReports.length + 1,
        location,
        wasteType,
        description
    };

    wasteReports.push(report);

    res.json({ message: "Report submitted", report });
});

// 🔹 Get All Reports
app.get("/reports", (req, res) => {
    res.json(wasteReports);
});

// 🔹 Delete Report
app.delete("/report/:id", (req, res) => {
    const id = parseInt(req.params.id);

    wasteReports = wasteReports.filter(r => r.id !== id);

    res.json({ message: "Report deleted" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});