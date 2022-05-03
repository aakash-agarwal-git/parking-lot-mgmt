const parkingLot = require("../services/db/schema/schema.parkingLot");
module.exports = {
  addParkingLots: async (req) => {
    try {
      const insertRes = await parkingLot.insertMany(req.body);
      return {
        message: `${req.body.code} added successfully`,
        success: true
      }
    } catch (error) {
      console.error(error);
      return {
        message: `Failed to add parking lot`,
        success: false,
        error: error.message
      }
    }
  },
  getAllParkingLots: async (req) => {
    try {
      const data = await parkingLot.find();
      return {
        data,
        success: true
      }
    } catch (error) {
      console.error(error);
      return {
        message: `Failed to fetch parking lots`,
        success: false,
        error: error.message
      }
    }
  },
};
