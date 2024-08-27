const bcrypt = require('bcryptjs');
const jwt = require('jwt');
const User = require('../models/User');

// Register user
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create new user
        const newUser = new User({ 
            name, 
            email, 
            password 
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        // Save user to database
        await newUser.save();

        // Return jsonwebtoken
        const payload = { 
            user: { 
                id: newUser.id 
            } 
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Authenticate user
exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        //check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        // Return JSON Web Token
        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(payload, 'your_jwt_secret', { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};