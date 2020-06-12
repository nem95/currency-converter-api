const express = require('express');
const router = express.Router();
const currencyConverterController = require('../controllers/currencyConverterController');

router.get('/convert', currencyConverterController.getConvertedCurrency);

module.exports = router;
