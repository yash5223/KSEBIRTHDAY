const express = require("express");
const cors = require("cors"); // Import CORS

const app = express();

// ✅ Allow CORS for all origins or specify allowed origins
app.use(cors({
  origin: "*", // Allows all domains (Use specific origin in production)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json()); // Enable JSON body parsing

app.post("/send-email", async (req, res) => {
  res.json({ message: "CORS issue fixed!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
