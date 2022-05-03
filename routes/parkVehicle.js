var express = require('express');
var router = express.Router();
const parkVehicle = require('../modules/parkVehicle');

/* GET parking lots list. */
router.get('/', async function(req, res, next) {
  const result = await parkVehicle.getHistoryOfVehicle(req);
  if(result.success){
    res.status(200).json(result);
  }else{
    res.status(400).json(result);
  }
});

/* POST Insert parking lot */
router.post('/', async function(req, res, next) {
  const result = await parkVehicle.park(req);
  if(result.success){
    res.status(201).json(result);
  }else{
    res.status(400).json(result);
  }
});

/* POST Insert parking lot */
router.post('/exit', async function(req, res, next) {
  const result = await parkVehicle.exit(req);
  if(result.success){
    res.status(201).json(result);
  }else{
    res.status(400).json(result);
  }
});
module.exports = router;
