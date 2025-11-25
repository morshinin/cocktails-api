const express = require('express');
const router = express.Router();
const controller = require('../controllers/housekeepingController');
const { authenticate } = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(authenticate);

// Zones
router.get('/zones', controller.getZones);
router.post('/zones', controller.createZone);
router.put('/zones/:id', controller.updateZone);
router.delete('/zones/:id', controller.deleteZone);

// Equipment
router.get('/equipment', controller.getEquipment);
router.post('/equipment', controller.createEquipment);
router.put('/equipment/:id', controller.updateEquipment);
router.delete('/equipment/:id', controller.deleteEquipment);

// Lost Items
router.get('/lost-items', controller.getLostItems);
router.post('/lost-items', controller.createLostItem);
router.put('/lost-items/:id', controller.updateLostItem);
router.delete('/lost-items/:id', controller.deleteLostItem);

// Cleaning Schedule
router.get('/schedule', controller.getSchedule);
router.post('/schedule', controller.createOrUpdateSchedule);

module.exports = router;
