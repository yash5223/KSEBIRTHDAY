const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors()); // Allow frontend requests

// ✅ Create the send-email endpoint
app.post("/send-email", async (req, res) => {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "nexus0k6@gmail.com", // Replace with your email
                pass: "yvthyzzubdtzbkny", // Use an app password, not your main password
            },
        });

        await transporter.sendMail({
            from: "nexus0k6@gmail.com",
            to,
            subject,
            text,
        });

        res.json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
