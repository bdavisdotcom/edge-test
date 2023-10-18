const express = require('express');
const { expressjwt: jwt } = require('express-jwt');

const protectedWithJwt = jwt({ secret: Buffer.from(process.env.JWT_SECRET, "base64"), algorithms: ["HS256"] });

// Routers
const router = express.Router();
const authRouter = express.Router();
const taskRouter = express.Router();
const userRouter = express.Router();

// Controllers
const statusController = require('./controllers/status.js');
const authController = require('./controllers/auth.js');
const taskController = require('./controllers/tasks.js');
const userController = require('./controllers/user.js');

// Middleware
const authMiddleware = require('./middleware/auth.js');

// Generic routes
router.get('/status', statusController);

// Authentication Routes
authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
router.use('/auth', authRouter);

// Task Routes - protected with jwt
taskRouter.get('/', taskController.getAll);
taskRouter.get('/:id', taskController.get);
taskRouter.post('/', taskController.put);
taskRouter.post('/:id', taskController.post);
router.use('/tasks', [protectedWithJwt, authMiddleware], taskRouter);

// User Routes - protected with jwt
userRouter.get('/', userController.get);
userRouter.post('/', userController.update)
router.use('/user', [protectedWithJwt, authMiddleware], userRouter);

module.exports = router;