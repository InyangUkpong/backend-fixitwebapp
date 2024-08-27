import { Router } from 'express';
const router = Router();
const {register, login } = require('../controllers/authController');



// Register routes
router.post('/register', register);

// Authenticate routes
router.post('/login', login);

module.exports = router;