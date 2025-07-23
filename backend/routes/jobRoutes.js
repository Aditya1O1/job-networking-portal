const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();
const Job = require('../models/Job');

// ✅ POST /api/jobs – Create a new job (Protected)
router.post('/jobs', verifyToken, async (req, res) => {
  try {
    const { title, description, skills, budget } = req.body;

    if (!title || !description || !skills || !budget) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const job = new Job({
      title,
      description,
      skills,
      budget,
      postedBy: req.user.userId
    });

    await job.save();

    res.status(201).json({ message: 'Job posted successfully!', job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ GET /api/jobs – Public route with skill filtering
router.get('/jobs', async (req, res) => {
  try {
    const { skill } = req.query;
    let filter = {};

    if (skill && skill.trim() !== '') {
      filter.skills = { $regex: new RegExp(skill, 'i') };
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// 🔐 GET /api/jobs/me – Jobs posted by logged-in user
router.get('/jobs/me', verifyToken, async (req, res) => {
  try {
    const userJobs = await Job.find({ postedBy: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json(userJobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch your jobs' });
  }
});

module.exports = router;
