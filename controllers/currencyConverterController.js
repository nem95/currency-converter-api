require('dotenv').config();
const moment = require('moment'); // require
const request = require('request-promise-native');

exports.getConvertedCurrency = async (req, res) => {
  const { base_currency, value, quote_currency } = req.query;

  const options = {
    uri: `${process.env.API_URL}latest?access_key=${process.env.API_KEY}`,
    json: true,
  };

  try {
    const response = await request(options);
    if (!response.success) return;

    const { rates } = response;
    const convertedCurrency = (value * rates[quote_currency]) / rates[base_currency];
    res.json(convertedCurrency);
  } catch (error) {
    res.status(err.status || 500);
    res.json(error);
  }
};

exports.getSymbols = async (req, res) => {
  const options = {
    uri: `${process.env.API_URL}symbols?access_key=${process.env.API_KEY}`,
    json: true,
  };

  try {
    const response = await request(options);
    if (!response.success) return;

    res.json(response.symbols);
  } catch (error) {
    res.status(err.status || 500);
    res.json(error);
  }
};

exports.getHistory = async (req, res) => {
  const history = {};

  try {
    for (let i = 0; i < 5; i++) {
      const date = moment().subtract(i, 'd').format('YYYY-MM-DD');
      const options = {
        uri: `${process.env.API_URL}${date}?access_key=${process.env.API_KEY}`,
        json: true,
      };

      if (history[`${date}`]) continue;
      const response = await request(options)
      history[`${date}`] = response.rates;
    }

    res.json(history)
  } catch (error) {
    res.status(err.status || 500);
    res.json(error);
  }
};

