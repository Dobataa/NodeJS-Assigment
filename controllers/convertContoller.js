const { Router } = require('express');
const getRates = require('../api/api');

const router = Router();

router.get('/', async (req, res) => {
    const { from, to, amount } = req.query;

    if (!from || !to || !amount) {
        return res.status(400).json({ error: 'Provide from, to, and amount query parameters' });
    }

    try {
        const data = await getRates();
        const rates = data.rates;

        if (!rates[from] || !rates[to]) {
            return res.status(400).json({ error: 'Invalid currency code' });
        }

        const convertedAmount = (amount / rates[from]) * rates[to];
        res.status(200).json({ from, to, amount, convertedAmount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
