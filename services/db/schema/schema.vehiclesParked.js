const mongoose = require("../dbService");

const VehiclesParked = new mongoose.Schema({
  area: { type: String, required:true },
  code: { type: String, required:true},
  vehicleNumber: { type: String, required:true },
  type: {
    type: String,
    required:true,
  },
  entryTime: {
    type: Date,
    required:true,
  },
  exitTime: {
    type: Date,
    default: null
  },
  amount: {
    type: Number,
    required:true,
    default: 0
  },
}, {collection:"VehiclesParked"});

module.exports = mongoose.model('VehiclesParked', VehiclesParked)