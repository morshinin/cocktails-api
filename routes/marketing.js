const express = require('express');
const router = express.Router();
const controller = require('../controllers/marketingController');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

// Regular Guests
router.get('/guests', controller.getGuests);
router.post('/guests', controller.createGuest);
router.put('/guests/:id', controller.updateGuest);
router.delete('/guests/:id', controller.deleteGuest);

// Merch
router.get('/merch', controller.getMerch);
router.post('/merch', controller.createMerch);
router.put('/merch/:id', controller.updateMerch);
router.delete('/merch/:id', controller.deleteMerch);

module.exports = router;
