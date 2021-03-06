const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const courses = require('./routes/api/courses');
const templates = require('./routes/api/templates');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());

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
app.use('/api/templates', templates);

// Server static assests if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port: ${port}`));