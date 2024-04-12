const Device = require('../models/device');

const getDevices = async () => {

    try {
        const devices = await Device.find();
        return {devices};
    } catch (error) {

        console.log('error getting devices', error);
    }
}

module.exports = getDevices;