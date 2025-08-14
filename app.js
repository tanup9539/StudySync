const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./routes/user');

const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/learntracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/user', userRoutes);

app.get('/dashboard', (req, res) => {
  const name = req.query.name || 'User';
  res.render('dashboard', { name });
});

app.get('/chatbot', (req, res) => {
  res.render('chatbot');
});
app.get('/trackprogress', (req, res) => {
  res.render('trackprogress')
});

app.get('/dailygoal', (req, res) => {
  res.render('dailygoal')
});
app.get('/studymaterial', (req, res) => {
  res.render('studymaterial')
});

app.get('/earnbadges', (req, res) => {
  res.render('earnbadges')
});
app.get('/updateprofile', (req, res) => {
  res.render('updateprofile')
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
