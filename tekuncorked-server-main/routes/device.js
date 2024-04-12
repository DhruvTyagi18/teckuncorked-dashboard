const express = require('express');
const router = express.Router();

const { handleGetDevices,
	handleGetDevicesById,
	handlePostDevice, 
	handleUpdateDevice,
	handleDeleteDevice,
	handleDeleteDeviceById
} = require('../controllers/device');

router.get('/', handleGetDevices);
router.get('/:id', handleGetDevicesById);
router.post('/', handlePostDevice);
router.put('/:id', handleUpdateDevice);
router.delete('/',handleDeleteDevice);
router.delete('/:id',handleDeleteDeviceById);


module.exports = router; 
