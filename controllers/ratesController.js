const { Router } = require('express');
const getRates = require('../api/api');

const router = Router();

router.get('/', async (req, res) => {
    const rates = await getRates();
    res.json(rates);
});

module.exports = router;