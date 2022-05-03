const parkingLot = require("../services/db/schema/schema.parkingLot");
const vehiclesParked = require("../services/db/schema/schema.vehiclesParked");
module.exports = {
  park: async (req) => {
    try {
      const parkingData = await parkingLot.findOne({ code: req.body.code });
      const parkingTypeData = parkingData.parkingFor?.filter(
        (vehicle) => vehicle.type === req.body.type
      );
      if (parkingTypeData.length > 0) {
        const vehicleCountInParking = await vehiclesParked
          .find({
            code: req.body.code,
            type: req.body.type,
            exitTime: { $ne: null },
          })
          .count();
        if (vehicleCountInParking < parkingTypeData[0]?.capacity) {
          const payload = req.body;
          payload["entryTime"] = new Date();
          payload["exitTime"] = null;
          const insertRes = await vehiclesParked.insertMany(payload);
          return {
            message: "Your vehicle is parked",
            success: true,
          };
        } else {
          return {
            message: "No Parking for your vehicle as parking is full",
            success: false,
          };
        }
      } else {
        return {
          message: "No Parking for your vehicle",
          success: false,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        message: `Failed to fetch parking lots`,
        success: false,
        error: error.message,
      };
    }
  },
  exit: async (req) => {
    try {
      const vehicleParkData = await vehiclesParked.findOne({
        vehicleNumber: req.body.vehicleNumber,
        code: req.body.code,
        exitTime: { $eq: null },
      });
      if (vehicleParkData) {
        // fetch rate card
        const parkingData = await parkingLot.findOne({ code: req.body.code });
        const parkingTypeData = parkingData.parkingFor?.filter(
          (vehicle) => vehicle.type === vehicleParkData.type
        );
        const parkingForVehicle = parkingTypeData[0];
        if (parkingTypeData.length > 0) {
          // Calculate bill
          const entryTime = new Date(vehicleParkData.entryTime);
          const exitTime = new Date();
          let hours = Math.round(Math.abs(exitTime - entryTime) / 36e5);
          // The subtraction returns the difference between the two dates in milliseconds.
          // 36e5 is t scientific notation for 60*60*1000, dividing by which converts
          // the milliseconds difference into hours.
          let amount = 0;
          Object.keys(parkingForVehicle.rateCard).forEach((key, idx) => {
            const hoursRate = key.split("-");
            if (
              (hours >= parseInt(hoursRate[0]) && hours <  parseInt(hoursRate[1])) ||
              (Object.keys(parkingForVehicle.rateCard).length - 1 === idx && amount === 0)
            ) {
              amount = parkingForVehicle.rateCard[key];
            }
          });
          const updateResult = await vehiclesParked.findOneAndUpdate(
            {
              vehicleNumber: req.body.vehicleNumber,
              code: req.body.code,
              exitTime: { $eq: null },
            },
            { amount, exitTime }
          );
          return {
            message: "Your amount due is " + amount,
            success: true,
          };
        } else {
          return {
            message: "Your vehicle not in this parking",
            success: false,
          };
        }
      } else {
        return {
          message: "Vehicle not found",
          success: false,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        message: `Failed to fetch parking lots`,
        success: false,
        error: error.message,
      };
    }
  },
  getHistoryOfVehicle: async (req) => {
    try {
      const parkingData = await vehiclesParked.find({
        vehicleNumber: req.query.vehicleNumber,
      });
      return {
        data: parkingData,
        success: true,
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Failed to fetch parking lots`,
        success: false,
        error: error.message,
      };
    }
  },
};
