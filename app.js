const express = require('express');
require('dotenv').config();
const session = require('express-session');
const flash = require('connect-flash');
const registerRoutes = require('./routes/users/register');
const loginRoutes = require('./routes/users/login');
const profileRoutes = require('./routes/users/profile');
const connection = require('./connection');
const app = express();

app.use(express.static('public')) // To serve static files (css, images, js, etc.)
app.use(express.urlencoded({extended: true}));
const sessionConfig = {
    secret: "thisshouldberealsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 5, // Expires in 5 hours
        maxAge: 1000 * 60 * 60 * 5
    }
}
app.use(session(sessionConfig));
app.use(flash());
app.use(express.json());
app.set('view engine', 'ejs');


app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/profile', profileRoutes);

app.listen(process.env.PORT || 3000, () => {console.log("Server is running on port 3000!");})


