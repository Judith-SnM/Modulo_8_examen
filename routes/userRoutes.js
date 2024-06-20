const express = require('express');
const { getUserData, updateUser } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/profile', authenticate, getUserData);
router.put('/profile', authenticate, updateUser);

module.exports = router;
