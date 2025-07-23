require('dotenv').config({ path: '../.env' }); // Load .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// Debug Logs
console.log("----- DEBUG BEGIN -----");
console.log("DEBUG __dirname:", __dirname);
console.log("DEBUG .env path exists?", fs.existsSync(path.join(__dirname, '../.env')));
console.log("DEBUG MONGO_URI:", process.env.MONGO_URI);
console.log("----- DEBUG END -----");

// Middlewares
app.use(cors());
app.use(express.json()); // 📍 Required for reading JSON in req.body

// ➕ Route Files
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes'); // 🔄 NEW

// 🔌 Register Routes
app.use('/api', authRoutes);
app.use('/api', jobRoutes); // 🔄 NEW

// 🔗 MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

// 🌐 Health Check
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong from server ✅' });
});

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
