const express = require('express');
const mongoose = require('mongoose');

const courses = require('./routes/api/courses');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Mongo connected'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello'));

// User routes
app.use('/api/courses', courses);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port: ${port}`));