const registerhotel = require('../controllers/register_hotels.controllers')

const express = require('express');
const router  = express.Router(); 

router.post('/addhotel', registerhotel.addHotel)
router.post('/updatehotel', registerhotel.updateHotel)

module.exports = router;