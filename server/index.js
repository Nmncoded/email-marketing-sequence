const express = require("express");
const mongoose = require("mongoose");
const Agenda = require("agenda");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

// Mongoose connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// // Initialize Agenda
const agenda = new Agenda({
  mongo: mongoose.connection.db,
  collection: 'emailJobs'
});

// start Agenda
(async () => {
  try {
    await agenda.start();
    console.log('Agenda started successfully');
  } catch (error) {
    console.error('Failed to start Agenda:', error);
  }
})();

// // Define the email job
agenda.define('send email', async (job) => {
  const { to, subject, body } = job.attrs.data;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: body,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
});

app.get("/test-server", async(req, res) => {
  res.status(200).json({
    message: "server tested successfully",
  });
});

//  Email scheduling API endpoint
app.post('/schedule-email', async (req, res) => {
  try {
    const {
      email,
      subject,
      body,
      scheduledTime = Date.now() + 60 * 60 * 1000 // Default to 1 hour from now
    } = req.body;
    console.log(req.body);
    if (!email || !subject || !body) {
      return res.status(400).json({
        error: 'Missing required fields',
        details: {
          email: !!email,
          subject: !!subject,
          body: !!body
        }
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    // Schedule the email job
    const job = await agenda.schedule(new Date(scheduledTime), 'send email', {
      to: email,
      subject: subject,
      body: body
    });
    console.log(`Email scheduled for ${scheduledTime}`,job);

    res.status(200).json({
      message: 'Email scheduled successfully',
      jobId: job.attrs._id,
      scheduledFor: new Date(scheduledTime)
    });
  } catch (error) {
    console.error('Error scheduling email:', error);
    res.status(500).json({
      error: 'Failed to schedule email',
      details: error.message
    });
  }
});

app.get('/scheduled-jobs', async (req, res) => {
  try {
    const jobs = await agenda.jobs({
      'data.to': { $exists: true },
      nextRunAt: { $exists: true }
    });

    // More robust mapping and error handling
    const formattedJobs = jobs.map(job => {
      // Safely access nested properties
      return {
        id: job.attrs?._id ? job.attrs._id.toString() : null,
        email: job.attrs?.data?.to || 'N/A',
        subject: job.attrs?.data?.subject || 'N/A',
        scheduledAt: job.attrs?.nextRunAt || null,
        status: job.attrs?.state || 'unknown'
      };
    }).filter(job => job.id !== null); 

    res.status(200).json(formattedJobs);
  } catch (error) {
    console.error('Detailed error retrieving jobs:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve scheduled jobs',
      details: error.message 
    });
  }
});


// // Graceful shutdown
async function gracefulShutdown() {
  await agenda.stop();
  process.exit(0);
}

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
