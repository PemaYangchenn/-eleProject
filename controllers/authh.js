const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = async (req, res) => {
    console.log(req.body);

    const { name, email, password, passwordConfirm } = req.body;
z
    // Client-side validation
    const nameRegex = /^[A-Za-z\s]{1,30}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(name) || !emailRegex.test(email) || password.length < 8 || password !== passwordConfirm) {
        return res.render('register', {
            message: 'Invalid input. Please check your input and try again.',
        });
    }

    // Server-side validation
    if (isNaN(name)) {
        return res.render('register', {
            message: 'Name should not be a number.',
        });
    }

    // Additional server-side password strength validation if needed
    // For example, you can check for the presence of uppercase, lowercase, digits, and special characters.
    const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordStrengthRegex.test(password)) {
        return res.render('register', {
            message: 'Password should be at least 8 characters and include at least one lowercase letter, one uppercase letter, one digit, and one special character.',
        });
    }

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
            return res.render('register', {
                message: 'An error occurred during registration',
            });
        }

        if (results.length > 0) {
            return res.render('register', {
                message: 'Email is already in use',
            });
        }

        try {
            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);

            db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (error, results) => {
                if (error) {
                    console.log(error);
                    return res.render('register', {
                        message: 'An error occurred during registration',
                    });
                } else {
                    return res.render('register', {
                        message: 'User registered',
                    });
                }
            });
        } catch (error) {
            console.log(error);
            return res.render('register', {
                message: 'An error occurred during registration',
            });
        }
    });
};
