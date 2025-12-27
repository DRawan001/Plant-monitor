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

let wateringOn = false;

/* Health check */
app.get("/", (req, res) => {
  res.send("Plant Monitor Backend Running");
});

/* Get watering status */
app.get("/api/status", (req, res) => {
  res.json({ watering: wateringOn });
});

/* Toggle watering */
app.post("/api/toggle", (req, res) => {
  wateringOn = !wateringOn;
  res.json({ watering: wateringOn });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
