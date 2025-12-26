const express = require("express");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

// ------------------ TEMP STORAGE ------------------
let moistureData = {
  A: 0,
  B: 0,
  C: 0
};

let systemStatus = false; // false = OFF, true = ON
// -------------------------------------------------

// Health check
app.get("/", (req, res) => {
  res.send("Plant Monitoring Backend Running");
});

// ESP sends moisture data
app.post("/api/moisture", (req, res) => {
  const { A, B, C } = req.body;

  if (A !== undefined) moistureData.A = A;
  if (B !== undefined) moistureData.B = B;
  if (C !== undefined) moistureData.C = C;

  res.json({ message: "Moisture data updated", moistureData });
});

// Frontend gets moisture data
app.get("/api/moisture", (req, res) => {
  res.json(moistureData);
});

// Toggle ON/OFF button
app.post("/api/toggle", (req, res) => {
  systemStatus = !systemStatus;
  res.json({ status: systemStatus });
});

// Get ON/OFF status
app.get("/api/status", (req, res) => {
  res.json({ status: systemStatus });
});

// ------------------ SERVER ------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
