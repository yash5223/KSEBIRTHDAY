const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const app = express();

// ✅ Allow CORS for all origins or specify allowed origins
app.use(cors({
  origin: "*", // Allows all domains (Use specific origin in production)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.post("/send-email", async (req, res) => {
  res.json({ message: "CORS issue fixed!" });
});
app.use(bodyParser.json());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nexus0k6@gmail.com", // Replace with your email
    pass: "yvthyzzubdtzbkny", // Use an App Password, NOT your main password
  },
});

// Function to generate PDF flyer
async function generatePDF(student) {
  const flyerHtml = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; }
          .flyer {
            width: 800px; height: 600px;
            border: 5px solid #0077cc; padding: 20px;
            background-color: #f4f4f4;
          }
          h1 { color: #0077cc; }
          p { font-size: 18px; }
        </style>
      </head>
      <body>
        <div class="flyer">
          <h1>${student.name}</h1>
          <p>Profession: ${student.profession}</p>
          <p>Email: ${student.email}</p>
          <p>Phone: ${student.phone}</p>
        </div>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(flyerHtml);
  
  const pdfPath = path.join(__dirname, `flyer-${student.name}.pdf`);
  await page.pdf({ path: pdfPath, format: "A4" });

  await browser.close();
  return pdfPath;
}

// Route to send email with PDF attachment
app.post("/send-email", async (req, res) => {
  const { students, subject, message } = req.body;

  if (!students || !Array.isArray(students)) {
    return res.status(400).json({ error: "Invalid students data" });
  }

  for (const student of students) {
    try {
      const pdfPath = await generatePDF(student);

      // Email options
      const mailOptions = {
        from: "nexus0k6@gmail.com",
        to: student.email,
        subject: subject || "Your Personalized Flyer",
        text: message || `Hello ${student.name}, here is your personalized flyer.`,
        attachments: [{ filename: `flyer-${student.name}.pdf`, path: pdfPath }],
      };

      await transporter.sendMail(mailOptions);
      console.log(`📧 Email sent to ${student.email}`);

      // Delete the PDF after sending email
      fs.unlinkSync(pdfPath);
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Failed to send email" });
    }
  }

  res.json({ message: "Emails sent successfully!" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
