const nodemailer = require("nodemailer");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(cors());
app.use(bodyParser.json());
const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "nexus0k6@gmail.com",
    pass: "yvthyzzubdtzbkny",
  },
});
async function generateFlyer(student) {
    const backgrounds = [
      "https://imgur.com/oHUCJGa.jpg",
      "https://imgur.com/KXfqsdt.jpg",
      "https://imgur.com/cCmgfEQ.jpg",
      "https://imgur.com/Dz0XVNw.jpg",
      "https://imgur.com/5tiYybx.jpg",
      "https://imgur.com/ncxzxie.jpg",
      "https://imgur.com/4wJWEO5.jpg",  // Saturday
    ]; // Get the current day (0: Sunday, 1: Monday, ..., 6: Saturday)
    const nowInIST = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const currentDay = nowInIST.getDay(); // Get the day of the week in IST
  
  // Select the appropriate background image based on the day of the week
  const backgroundImage = backgrounds[currentDay];

let photoContainerStyle = '';
let contentStyle = '';
let headingStyle = '';
let paragraphStyle = '';
let photoimgStyle = '';

let leftPositionContent = '';
let topPositionContent = '';
let leftPositionPhoto = '';
let topPositionPhoto = '';

let leftPositionHeading = '';
let topPositionHeading = '';
let leftPositionParagraph = '';
let topPositionParagraph = '';

if (currentDay === 0) { // Sunday
  photoContainerStyle = `
  width: 290px;
  height: 290px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solidrgb(99, 100, 38);
  box-shadow: 0 5px 10px rgba(23, 103, 224, 0.97);
`;
contentStyle = `
  color:rgb(235, 241, 241);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  font-size: 20px;
  text-align: left;
`;
headingStyle = `
  color: rgb(243, 242, 247);
  font-family: Times New Roman;
  font-size: 45px;
  font-weight: bold;
  text-align: left;
`;
paragraphStyle = `
  font-size: 30px;
  color: rgb(238, 236, 243);
  font-weight: normal;
`;
photoimgStyle = `
  width: 100%;
  height: 100%;
  object-fit: cover; 
`;
leftPositionContent = '15px';
topPositionContent = '250px';
leftPositionPhoto = '400px'; // Align photo to the right
topPositionPhoto = '310px'; // Adjust top for photo

leftPositionHeading = '15px';
topPositionHeading = '35px'; // Heading is near content
leftPositionParagraph = '15px';
topPositionParagraph = '115px'; 

}else if(currentDay === 1) { // Monday
  photoContainerStyle = `
    width: 290px;
    height: 290px;
    border-radius: 50%;
    overflow: hidden;
    border: 5px solid #272664;
    box-shadow: 0 5px 10px rgba(243, 241, 241, 0.966);
  `;
  contentStyle = `
    color:rgb(242, 248, 247);
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    font-size: 20px;
    text-align: left;
  `;
  headingStyle = `
    color: rgb(255, 255, 255);
    font-family: Times New Roman;
    font-size: 48px;
    font-weight: bold;
    text-align: left;
  `;
  paragraphStyle = `
    font-size: 28px;
    color: rgb(255, 255, 255);
    font-weight: normal;
  `;
  photoimgStyle = `
    width: 100%;
    height: 100%;
    object-fit: cover;
  `;
  leftPositionContent = '18px';
  topPositionContent = '250px';
  leftPositionPhoto = '400px'; // Align photo to the right
  topPositionPhoto = '310px'; // Adjust top for photo

  leftPositionHeading = '18px';
  topPositionHeading = '10px'; // Heading is near content
  leftPositionParagraph = '18px';
  topPositionParagraph = '90px';

} else if (currentDay === 2) { // Tuesday
  photoContainerStyle = `
          width: 290px;
          height: 290px;
          border-radius: 50%;
          overflow: hidden;
          border: 5px solidrgb(0, 0, 0);
          box-shadow: 0 5px 10px rgba(243, 241, 241, 0.966);
        `;
        contentStyle = `
          color: #673ab7;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
          font-size: 17px;
          text-align: left;
        `;
        headingStyle = `
          color:: #673ab7;
          font-family: Times New Roman;
          font-size: 42px;
          font-weight: bold;
          text-align: left;
        `;
        paragraphStyle = `
          font-size: 23px;
          color: #673ab7;
          font-weight: normal;
        `;
        photoimgStyle = `
          width: 100%;
          height: 100%;
          object-fit: cover;
        `;
        leftPositionContent = '350px';
        topPositionContent = '170px';
        leftPositionPhoto = '400px'; // Align photo to the right
        topPositionPhoto = '310px'; // Adjust top for photo

        leftPositionHeading = '18px';
        topPositionHeading = '10px'; // Heading is near content
        leftPositionParagraph = '18px';
        topPositionParagraph = '90px';
}
else if (currentDay === 3) { 
  photoContainerStyle = `
  width: 290px;
  height: 290px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid #272664;
  box-shadow: 0 5px 10px rgba(243, 241, 241, 0.966);
`;
contentStyle = `
  color: #009688;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  font-size: 20px;
  text-align: left;
`;
headingStyle = `
  color: rgb(63, 19, 237);
  font-family: Times New Roman;
  font-size: 45px;
  font-weight: bold;
  text-align: left;
`;
paragraphStyle = `
  font-size: 30px;
  color: rgb(63, 19, 237);
  font-weight: normal;
`;
photoimgStyle = `
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
leftPositionContent = '35px';
topPositionContent = '250px';
leftPositionPhoto = '400px'; // Align photo to the right
topPositionPhoto = '310px'; // Adjust top for photo

leftPositionHeading = '35px';
topPositionHeading = '4px'; // Heading is near content
leftPositionParagraph = '35px';
topPositionParagraph = '70px'; // Increase top for paragraph to avoid overlap


  }else if (currentDay === 4) { 
        photoContainerStyle = `
          width: 290px;
          height: 290px;
          border-radius: 50%;
          overflow: hidden;
          border: 5px solid #272664;
          box-shadow: 0 5px 10px rgba(243, 241, 241, 0.966);
        `;
        contentStyle = `
          color: #009688;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
          font-size: 20px;
          text-align: left;
        `;
        headingStyle = `
          color: rgb(255, 255, 255);
          font-family: Times New Roman;
          font-size: 45px;
          font-weight: bold;
          text-align: left;
        `;
        paragraphStyle = `
          font-size: 30px;
          color: rgb(255, 255, 255);
          font-weight: normal;
        `;
        photoimgStyle = `
          width: 100%;
          height: 100%;
          object-fit: cover;
        `;
        leftPositionContent = '18px';
        topPositionContent = '280px';
        leftPositionPhoto = '400px'; // Align photo to the right
        topPositionPhoto = '310px'; // Adjust top for photo

        leftPositionHeading = '18px';
        topPositionHeading = '10px'; // Heading is near content
        leftPositionParagraph = '18px';
        topPositionParagraph = '90px';

  } else if (currentDay === 5) { // Friday
    photoContainerStyle = `
    width: 290px;
    height: 290px;
    border-radius: 50%;
    overflow: hidden;
    border: 5px solidrgb(99, 100, 38);
    box-shadow: 0 5px 10px rgba(243, 241, 241, 0.966);
  `;
  contentStyle = `
    color: #009688;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    font-size: 20px;
    text-align: left;
  `;
  headingStyle = `
    color: rgb(243, 242, 247);
    font-family: Times New Roman;
    font-size: 45px;
    font-weight: bold;
    text-align: left;
  `;
  paragraphStyle = `
    font-size: 30px;
    color: rgb(238, 236, 243);
    font-weight: normal;
  `;
  photoimgStyle = `
    width: 100%;
    height: 100%;
    object-fit: cover; 
  `;
  leftPositionContent = '35px';
  topPositionContent = '300px';
  leftPositionPhoto = '400px'; // Align photo to the right
  topPositionPhoto = '310px'; // Adjust top for photo

  leftPositionHeading = '30px';
  topPositionHeading = '19px'; // Heading is near content
  leftPositionParagraph = '30px';
  topPositionParagraph = '100px'; // Increase top for paragraph to avoid overlap



  } else if (currentDay === 6) { // Saturday
    photoContainerStyle = `
    width: 290px;
    height: 290px;
    border-radius: 50%;
    overflow: hidden;
    border: 5px solidrgb(99, 100, 38);
    box-shadow: 0 5px 10px rgba(23, 103, 224, 0.97);
  `;
  contentStyle = `
    color:rgb(235, 241, 241);
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    font-size: 20px;
    text-align: left;
  `;
  headingStyle = `
    color: rgb(243, 242, 247);
    font-family: Times New Roman;
    font-size: 45px;
    font-weight: bold;
    text-align: left;
  `;
  paragraphStyle = `
    font-size: 30px;
    color: rgb(238, 236, 243);
    font-weight: normal;
  `;
  photoimgStyle = `
    width: 100%;
    height: 100%;
    object-fit: cover; 
  `;
  leftPositionContent = '15px';
  topPositionContent = '250px';
  leftPositionPhoto = '400px'; // Align photo to the right
  topPositionPhoto = '310px'; // Adjust top for photo

  leftPositionHeading = '15px';
  topPositionHeading = '35px'; // Heading is near content
  leftPositionParagraph = '15px';
  topPositionParagraph = '115px';  // Increase top for paragraph to avoid overlap


  }

// Applying styles dynamically in HTML content
const flyerHtml = `
  <html>
    <head>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Arial', sans-serif;
          background: #e0e0e0;
        }
        .flyer {
          width: 768px;
          height: 768px;
          background: url('${backgroundImage}') center center / cover no-repeat;
          border: 2px solid #0077cc;
          border-radius: 15px;
          overflow: hidden;
        }
        .content {
          position: absolute;
          left: ${leftPositionContent};
          top: ${topPositionContent};
          ${contentStyle}
        }
        .content h1 {
          position: absolute;
          left: ${leftPositionHeading};
          top: ${topPositionHeading};
          font-family:Times New Roman;
          ${headingStyle}
        }
        .content p {
          position: absolute;
          left: ${leftPositionParagraph};
          top: ${topPositionParagraph};
          font-family:Times New Roman;
          ${paragraphStyle}
          white-space: nowrap; /* Prevent wrapping */
        }
        .photo-container {
          position: absolute;
          left: ${leftPositionPhoto};
          top: ${topPositionPhoto};
          ${photoContainerStyle}
        }
        .photo-container img {
          ${photoimgStyle}
        }
      </style>
    </head>
    <body>
      <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center">
            <table class="flyer" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width: 100%; height: 100%; position: relative;">
                  <table width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                      <td style="padding: 0; text-align: center;">
                        <!-- Photo Container (Positioned Dynamically) -->
                        <table class="photo-container" cellpadding="0" cellspacing="0" style="${photoContainerStyle}">
                          <tr>
                            <td style="padding: 0;">
                              <img src="${student.photo}" alt="${student.name}'s Photo" style="${photoimgStyle}" />
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 0;">
                        <!-- Content (Positioned Dynamically) -->
                        <div class="content" style="${contentStyle}">
                          <h1 style="${headingStyle}">${student.name}</h1>
                          <p style="${paragraphStyle}">${student.profession}</p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;
const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewport({ width: 768, height: 768 });
  await page.setContent(flyerHtml);
  const filePath = path.resolve(__dirname, `flyer-${student.name}.png`);

  await page.screenshot({
    path: filePath,
    fullPage: false,
  });

  await browser.close();

  return filePath;
}

// Route to handle sending emails with flyer attachments
app.post("/send-email", async (req, res) => {
    try {
        // Your email sending logic here
        res.status(200).json({ message: "Emails sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error sending emails", error });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
