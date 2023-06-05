import { Router } from 'express';

// Controllers for managing users authentication.
import {
  handleUserLogOut,
  handleUserSignUp,
  handleUserLogIn,
  handleEmailVerification
} from '../Controllers/authController';

// Middlewares.
import validateCredentials from '../Middlewares/validateCredentials';

// Initialising express router.
const router = Router();

// Handling all GET requests.
router.get('/log-out', handleUserLogOut);
router.get('/verify', handleEmailVerification);

// Applying Middlewares.
router.use(validateCredentials);

// Handling all POST requests.
router.post('/sign-up', handleUserSignUp);
router.post('/log-in', handleUserLogIn);

export default router;
