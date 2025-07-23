const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/register', (req, res) => {
  console.log('🟢 REGISTER endpoint hit');
  console.log('Body:', req.body);
  res.json({ message: 'Register route works ✅' });
});

app.listen(5000, () => {
  console.log('🚀 Test server running at http://localhost:5000');
});
