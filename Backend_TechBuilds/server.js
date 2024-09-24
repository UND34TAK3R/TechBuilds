import mysql from 'mysql2';
import express from 'express';
import bcrypt from 'bcryptjs'; // Use bcryptjs for compatibility
import cors from 'cors';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

function formatDateToMySQL(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'UNDERTAKER_PC',
  user: 'root',
  password: 'Bourne9127!',
  database: 'user_db'
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'outlook', 
  auth: {
    user: 'dmangari@live.fr',  // Your Outlook email
    pass: 'Bourne9127!'  // Your email password or app-specific password
  }
});

// Route for handling sign-up
app.post('/signup', async (req, res) => {
  console.log('Signup request received:', req.body);
  const { username, email, password } = req.body;

  // Check if the email is already in use
  const [EmailInUse] = await connection.promise().query('SELECT * FROM users WHERE email = ?', [email]);

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  } else if (EmailInUse.length > 0) {
    return res.status(409).json({ message: 'Email already in use' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    connection.query(query, [username, email, hashedPassword], (err) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ message: 'Error saving user data' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (err) {
    console.error('Error hashing password:', err);
    res.status(500).json({ message: 'Error hashing password' });
  }
});

// Route for handling login
app.post('/login', async (req, res) => {
  console.log('Login request received:', req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const [rows] = await connection.promise().query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Error during login' });
  }
});

// Route for password reset request
app.post('/forgotpasswd', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const [rows] = await connection.promise().query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = rows[0];
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetURL = `http://localhost:5500/changepassword/${resetToken}`;
    const expirationTime = formatDateToMySQL(Date.now() + 3600000); // Token expires in 1 hour

    // Update database with resetToken and its expiration time
    await connection.promise().query('UPDATE users SET resetToken = ?, resetTokenExpires = ? WHERE email = ?', [resetToken, expirationTime, email]);

    // Send password reset email
    const mailOptions = {
      from: 'dmangari@live.fr',
      to: user.email,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetURL}">${resetURL}</a></p>`
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).json({ message: 'Error sending email' });
      }
      res.status(200).json({ message: 'Password reset link sent to your email' });
    });
  } catch (err) {
    console.error('Error processing password reset request:', err);
    res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
});

// Route for validating the reset token
const validateToken = async (req, res, next) => {
  const { token } = req.params || req.body; // Check if token comes from params or body
  try {
    const [rows] = await connection.promise().query('SELECT * FROM users WHERE resetToken = ? AND resetTokenExpires > ?', [token, Date.now()]);

    if (rows.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    req.user = rows[0]; // Attach user to request object for later use
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    console.error('Error during token validation:', err);
    return res.status(500).json({ message: 'An error occurred while validating the token.' });
  }
};

// Route for token validation
app.get('/changepassword/:token', validateToken, (req, res) => {
  // If the token is valid, render the change password page
  res.status(200).json({ message: 'Token is valid' });
  // You can render a view here if you want, but since you're using React, this might not be necessary.
});

// Route for changing the password
app.post('/changepassword', validateToken, async (req, res) => {
  const { password } = req.body; // Get password from body
  const user = req.user; // Get user from request object (validated in middleware)

  // Validate input
  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password and clear reset token
    await connection.promise().query('UPDATE users SET password = ?, resetToken = NULL, resetTokenExpires = NULL WHERE id = ?', [hashedPassword, user.id]);

    // Send a success response
    return res.status(200).json({ message: 'Password changed successfully' });

  } catch (err) {
    console.error('Error changing password:', err);
    // Ensure that you are returning a response only once
    if (!res.headersSent) {
      return res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
  }
});

// Start the server
const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
