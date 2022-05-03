const mongoose = require("../dbService");

const parkingLotSchema = new mongoose.Schema({
  area: { type: String, required:true },
  code: { type: String, required:true, unique: true},
  name: { type: String, required:true },
  parkingFor: {
    type: Array,
    required:true,
    default: []
  },
//   parkingFor: {
//     type: [{type: String, capacity: Number, rateCard:{
//         "0-2": Number,
//         "2-4": Number,
//         "4-6": Number,
//         "6-8": Number,
//         "8-24": Number,
//     }}],
//     required:true,
//     default: []
//   },
}, {collection:"ParkingLot"});

module.exports = mongoose.model('ParkingLot', parkingLotSchema)