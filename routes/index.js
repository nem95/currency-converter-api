const express = require('express');
const router = express.Router();
const currencyConverterController = require('../controllers/currencyConverterController');

router.get('/convert', currencyConverterController.getConvertedCurrency);
router.get('/symbols', currencyConverterController.getSymbols);
router.get('/history', currencyConverterController.getHistory);

module.exports = router;
