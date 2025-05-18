const express = require("express");
const mysql = require("mysql");
const path = require('path');
const app = express();
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
// Update the path to point to the public directory, not a specific CSS file
app.use(express.static(publicDirectory));

//Parse url encoded bodies 
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('view engine', 'hbs');

db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MYSQL connected");
    }
});

//define routes
app.use('/', require('./routes/pages'));
app.use('/auth',require('./routes/auth'));

app.listen(5001, () =>
    console.log("Server started on Port 5001")
);
