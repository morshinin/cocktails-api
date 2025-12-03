const express = require('express');
const router = express.Router();
const {
    getBarCounters,
    getBarCounterById,
    createBarCounter,
    updateBarCounter,
    deleteBarCounter
} = require('../controllers/barCountersController');
const { authenticate } = require('../middleware/auth');

// All routes require authentication
router.get('/', authenticate, getBarCounters);
router.get('/:id', authenticate, getBarCounterById);
router.post('/', authenticate, createBarCounter);
router.put('/:id', authenticate, updateBarCounter);
router.delete('/:id', authenticate, deleteBarCounter);

module.exports = router;
