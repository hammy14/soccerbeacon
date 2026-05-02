const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

// Register new admin user
exports.register = async (req, res) => {
  try {
    const { email, password, first_name, last_name, role = 'editor' } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const connection = await pool.getConnection();

    // Check if user already exists
    const [existing] = await connection.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      connection.release();
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const [result] = await connection.query(
      `INSERT INTO users (email, password_hash, first_name, last_name, role)
       VALUES (?, ?, ?, ?, ?)`,
      [email, hashedPassword, first_name || null, last_name || null, role]
    );

    connection.release();

    res.status(201).json({
      id: result.insertId,
      email,
      role,
      message: 'User registered successfully',
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const connection = await pool.getConnection();

    // Find user
    const [users] = await connection.query(
      'SELECT * FROM users WHERE email = ? AND is_active = true',
      [email]
    );

    if (users.length === 0) {
      connection.release();
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = users[0];

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      connection.release();
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Update last login
    await connection.query(
      'UPDATE users SET last_login = NOW() WHERE id = ?',
      [user.id]
    );

    connection.release();

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
      },
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const connection = await pool.getConnection();

    const [users] = await connection.query(
      'SELECT id, email, first_name, last_name, role, is_active, last_login FROM users WHERE id = ?',
      [userId]
    );

    connection.release();

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(users[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { currentPassword, newPassword } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new passwords are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }

    const connection = await pool.getConnection();

    // Get user
    const [users] = await connection.query(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];

    // Verify current password
    const passwordMatch = await bcrypt.compare(currentPassword, user.password_hash);

    if (!passwordMatch) {
      connection.release();
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await connection.query(
      'UPDATE users SET password_hash = ? WHERE id = ?',
      [hashedPassword, userId]
    );

    connection.release();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
};

// Verify token
exports.verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    res.json({
      valid: true,
      user: decoded,
    });
  } catch (error) {
    res.status(401).json({
      valid: false,
      error: 'Invalid or expired token',
    });
  }
};
