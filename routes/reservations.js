const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservationController');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

router.get('/', controller.getReservations);
router.post('/', controller.createReservation);
router.put('/:id', controller.updateReservation);
router.delete('/:id', controller.deleteReservation);

module.exports = router;
