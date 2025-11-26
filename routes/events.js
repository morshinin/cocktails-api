const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventController');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

// DJs
router.get('/djs', controller.getDJs);
router.post('/djs', controller.createDJ);
router.put('/djs/:id', controller.updateDJ);
router.delete('/djs/:id', controller.deleteDJ);

// Events
router.get('/schedule', controller.getEvents);
router.post('/schedule', controller.createEvent);
router.put('/schedule/:id', controller.updateEvent);
router.delete('/schedule/:id', controller.deleteEvent);

module.exports = router;
