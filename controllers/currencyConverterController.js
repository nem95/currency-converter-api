require('dotenv').config();
const request = require('request-promise-native');

exports.getConvertedCurrency = async (req, res) => {
  const { base_currency, value, quote_currency } = req.query;

  const options = {
    uri: `http://data.fixer.io/api/latest?access_key=${process.env.API_KEY}`,
    json: true,
  };

  try {
    const response = await request(options);
    if (!response.success) return;

    const { rates } = response;
    const convertedCurrency = (value * rates[quote_currency]) / rates[base_currency];
    res.json(convertedCurrency);
  } catch (error) {
    console.error(error);
  }
};
