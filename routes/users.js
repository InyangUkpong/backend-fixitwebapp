import express from 'express';
import User from '../models/User.js'; // Import the User model

const router = express.Router();

// Middleware to authenticate and get the user ID (assuming JWT authentication)
const authenticate = (req, res, next) => {
    // Example middleware to mock authentication and user ID extraction
    // Replace this with your actual authentication logic
    req.userId = 'someUserId'; // This should come from JWT token or session
    next();
};

// Get user profile
router.get('/profile', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password'); // Exclude the password field
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user profile
router.put('/profile', authenticate, async (req, res) => {
    const { name, email } = req.body;

    // Validate input fields (add more validation as needed)
    if (!name && !email) {
        return res.status(400).json({ message: 'No fields to update' });
    }

    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        if (name) user.name = name;
        if (email) user.email = email;

        await user.save();
        res.json({ message: 'User profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete user account
router.delete('/profile', authenticate, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Add more user-related routes here (e.g., delete account, list users, etc.)

export default router;