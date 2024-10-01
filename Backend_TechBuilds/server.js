import mysql from 'mysql2';
import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { build } from 'vite';

dotenv.config();

// Middleware to authenticate JWT token
function authenticateUserToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token required' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user; // Attach user information to request object
    next(); // Proceed to next middleware
  });
}

// Middleware to authenticate build token
function authenticateBuildToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token required' });
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, build) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.build = build;  // Attach build information to request object
    next();  // Proceed to next middleware
  });
}

// Function to generate a build token
function generateBuildToken(buildId, userId) {
  const token = jwt.sign({ id: buildId, userId: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });
  return token;
}
const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

// Route for handling sign-up
app.post('/signup', async (req, res) => {
  console.log('Signup request received:', req.body);
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const [EmailInUse] = await connection.promise().query('SELECT * FROM users WHERE email = ?', [email]);

  if (EmailInUse.length > 0) {
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

    // Generate a JWT token with an expiration of 1 hour
    const token = jwt.sign({ id: user.user_id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });


    res.status(200).json({ message: 'Login successful', token }); // Send the token in response
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Error during login' });
  }
});


const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or an app-specific password
  }
});

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
    const resetURL = `http://localhost:5500/reset-password/${resetToken}`;

    // Here, save the resetToken to the database with an expiration time (optional)

    // Send email
    const mailOptions = {
      from: `"TechBuilds"<${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Please click the link to reset your password: ${resetURL}`,
      html: `<p>You requested a password reset. Please click <a href="${resetURL}">here</a> to reset your password.</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email' });
      }
      res.status(200).json({ message: 'Email sent successfully!' });
    });

  } catch (err) {
    console.error('Error during password reset request:', err);
    res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
});


// Authenticated route to check if token is valid and user is logged in
app.get('/user/status', authenticateUserToken, async (req, res) => {
  try {
    const userId = req.user.id; // Should now hold the correct user_id from the JWT
    const [rows] = await connection.promise().query('SELECT user_id, username FROM users WHERE user_id = ?', [userId]);

    if (rows.length > 0) {
      res.json({ user_id: rows[0].user_id, username: rows[0].username });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/CPU', (req, res) => {
  connection.query('SELECT * FROM cpu_desktop', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results); // Directly send the results
  });
});


app.get('/Case', (req, res) => {
  connection.query('SELECT * FROM pc_case', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results); // Directly send the results
  });
});

app.get('/CPU_Cooler', (req, res) => {
  connection.query('SELECT * FROM cpu_coolers', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results); // Directly send the results
  });
});

app.get('/GPU', (req, res) => {
  connection.query('SELECT * FROM desktop_gpu', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results); // Directly send the results
  });
});

app.get('/MB', (req, res) => {
  connection.query('SELECT * FROM motherboard', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results); // Directly send the results
  });
});

app.get('/NetAdapter', (req, res) => {
  connection.query('SELECT * FROM network_adapters', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results); // Directly send the results
  });
});

app.get('/OS', (req, res) => {
  connection.query('SELECT * FROM os', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results); // Directly send the results
  });
});


app.get('/PSU', (req, res) => {
  connection.query('SELECT * FROM psu', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results); // Directly send the results
  });
});


app.get('/RAM', (req, res) => {
  connection.query('SELECT * FROM ram', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results); // Directly send the results
  });
});


app.get('/Storage', (req, res) => {
  connection.query('SELECT * FROM storage', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results); // Directly send the results
  });
});

app.get('/lastBuild/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const [rows] = await connection.promise().query('SELECT build_name FROM build WHERE user_id = ? ORDER BY created_at DESC LIMIT 1', [userId]);
    
    if (rows.length > 0) {
      res.json({ build_name: rows[0].build_name }); // Return the last build name
    } else {
      res.status(404).json({ message: 'No builds found' });
    }
  } catch (error) {
    console.error('Error fetching last build:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/NewBuild', async (req, res) => {
  const { BuildName, BuildType, userId } = req.body;

  if (!BuildName || !BuildType || !userId) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  try {
    const query = 'INSERT INTO build (build_name, build_type, user_id) VALUES (?, ?, ?)';
    connection.query(query, [BuildName, BuildType, userId], (err) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ message: 'Error saving build data' });
      }
      res.status(201).json({ message: 'Build registered successfully' });
    });
  } catch (err) {
    console.error('Error during build registration:', err);
    res.status(500).json({ message: 'Error during build registration' });
  }
});

app.get('/build/status', authenticateBuildToken, async (req, res) => {
  try {
    const buildId = req.build.id; // Token should have a build_id attached

    if (!buildId) {
      return res.status(400).json({ message: 'Build ID not provided' });
    }

    const [rows] = await connection.promise().query('SELECT build_id FROM build WHERE build_id = ?', [buildId]);

    if (rows.length > 0) {
      res.json({ build_id: rows[0].build_id });
    } else {
      res.status(404).json({ message: 'Build not found' });
    }
  } catch (error) {
    console.error('Error fetching build status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/AddCPU', async (req, res) => {
  const { build_id, cpu_id } = req.body;

  if (!build_id || !cpu_id) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  try {
    // Query to insert cpu_id into the BUILD table if the build_id exists
    const query = `
      UPDATE BUILD 
      SET cpu_id = ?
      WHERE build_id = ?;

    `;

    // Execute the query
    connection.query(query, [cpu_id, build_id], (err) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ message: 'Error saving build data' });
      }
      res.status(201).json({ message: 'Build registered successfully' });
    });
  } catch (err) {
    console.error('Error during build registration:', err);
    res.status(500).json({ message: 'Error during build registration' });
  }
});




// Start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
