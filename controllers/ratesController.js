const { Router } = require('express');
const getRates = require('../api/api');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const data = await getRates();
        res.status(200).json(data.rates);
    } catch (error) {
        res.status(500).json({error: error.message} );
    }
});

module.exports = router;