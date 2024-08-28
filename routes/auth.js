import express from 'express'; // im importing express
import { register, login } from '../controllers/authController.js'; // Named imports

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;