var express = require('express');
var router = express.Router();
const parkingModule = require('../modules/parkingLot');

/* GET parking lots list. */
router.get('/', async function(req, res, next) {
  const result = await parkingModule.getAllParkingLots(req);
  if(result.success){
    res.status(200).json(result)
  }else{
    res.status(400).json(result)
  }
});

/* POST Insert parking lot */
router.post('/', async function(req, res, next) {
  const result = await parkingModule.addParkingLots(req);
  if(result.success){
    res.status(201).json(result)
  }else{
    res.status(400).json(result)
  }
});
module.exports = router;
