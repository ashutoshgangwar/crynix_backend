const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes.js'));
app.use('/api/user', require('./routes/user.routes.js'));
app.use('/api/baby', require('./routes/baby.routes.js'));
app.use('/api/baby-cry', require('./routes/babyCry.routes.js'));

// Serve uploaded files statically
app.use('/uploads', express.static(uploadDir));

module.exports = app;
