import express from "express";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());

// POST route for sending email
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // From Vercel env
        pass: process.env.EMAIL_PASS, // From Vercel env
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `New message from ${name}`,
      text: `From: ${name} (${email})\n\n${message}`,
    });

    res.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send message" });
  }
});

// Export for Vercel serverless
export default app;