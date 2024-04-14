const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = 3001;

// Middleware to enable CORS
app.use(cors());
// Middleware to parse incoming JSON data
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Server is live!");
});

// Handle form submissions
app.post("/send-email", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yemregumus83@gmail.com", // Replace with your Gmail address
        pass: "qmtt nfox oywe fmmz", // Replace with your Gmail password or an app-specific password
      },
    });

    // Define email options
    const mailOptions = {
      from: "yemregumus83@gmail.com", // Sender address
      to: "yemregumus83@gmail.com", // Replace with your email address for receiving submissions
      subject: "Someone reached at you from your website!",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
