import express from 'express';

import { signin, signup, verifyEmail } from '../controllers/usersControllers.js';
import emailVerification from '../middleware/emailConfirmation.js';

const router = express.Router();

router.post('/signin', emailVerification, signin);
router.post('/signup', signup);
router.get('/verify-email', verifyEmail);

export default router;