const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
	name: { type: String, required: true },
	location: { type: String, required: true },
	temperature1: { type: Number, required: true },
	temperature2: { type: Number, required: true },
	temperature3: { type: Number, required: true },
});


const obj = {
	"name": "device1",
	"location": "orai",
	"temperature1": 40,
	"temperature2": 34,
	"temperature3": 45
  }

module.exports = mongoose.model('Device', deviceSchema);

