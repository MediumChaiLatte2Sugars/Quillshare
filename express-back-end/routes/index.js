const express = require('express');
const router = express.Router();

// Import and use individual route files
router.use('/stories', require('./stories'));
router.use('/users', require('./users'));
router.use('/categories', require('./categories'));
router.use('/tags', require('./tags'));
router.use('/messages', require('./messages'));
router.use('/notifications', require('./notifications'));
router.use('/likes', require('./likes'));

module.exports = router;
