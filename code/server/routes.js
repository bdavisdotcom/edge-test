const express = require('express');
const { expressjwt: jwt } = require('express-jwt');

const protectedWithJwt = jwt({ secret: Buffer.from(process.env.JWT_SECRET, "base64"), algorithms: ["HS256"] });

// Routers
const router = express.Router();
const authRouter = express.Router();
const taskRouter = express.Router();
const profileRouter = express.Router();

// Controllers
const statusController = require('./controllers/status.js');
const authController = require('./controllers/auth.js');
const taskController = require('./controllers/tasks.js');
const profileController = require('./controllers/profile.js');

// Middleware
const authMiddleware = require('./middleware/auth.js');

// Generic routes
router.get('/status', statusController);

// Authentication Routes
authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
router.use('/auth', authRouter);

// Task Routes - protected with jwt
taskRouter.get('/', taskController.get);
router.use('/tasks', [protectedWithJwt, authMiddleware], taskRouter);

// Profile Routes - protected with jwt
profileRouter.get('/', profileController.get);
profileRouter.post('/', profileController.update)
router.use('/profile', [protectedWithJwt, authMiddleware], profileRouter);

module.exports = router;