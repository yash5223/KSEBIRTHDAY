const express = require("express");
const cors = require("cors"); // Import CORS

const app = express();

// ✅ Allow CORS for all origins or specify allowed origins
app.use(cors({
  origin: "https://yash5223.github.io", // Allow your frontend
  methods: ["GET", "POST", "OPTIONS"], // Allow necessary methods
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json()); // Enable JSON body parsing

app.post("/send-email", async (req, res) => {
  res.json({ message: "CORS issue fixed!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
