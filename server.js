const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors({
    origin: "*", // Allow all origins
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type"
}));

app.use(express.json());

// Email Sending API
app.post("/send-birthday-email", async (req, res) => {
    console.log("📩 Received birthday email request:", req.body);

    const { to, name } = req.body;
    
    if (!to || !name) {
        console.error("❌ Missing email parameters:", { to, name });
        return res.status(400).json({ error: "Missing email parameters" });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const subject = `🎉 Happy Birthday, ${name}! 🎂`;
    const text = `Dear ${name},\n\nWishing you a very Happy Birthday! 🎈🥳 May your day be filled with love, joy, and laughter.\n\nBest wishes,\nYour Friend`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Birthday email sent successfully!");
        res.status(200).json({ message: "Birthday email sent successfully!" });
    } catch (error) {
        console.error("❌ Error sending email:", error.message);
        res.status(500).json({ error: "Error sending email: " + error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
