const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/auth', require('./routes/auth.routes.js'));
// User profile
app.use('/api/user', require('./routes/user.routes.js'));

// Baby profile
app.use('/api/baby', require('./routes/baby.routes.js'));

module.exports = app;

