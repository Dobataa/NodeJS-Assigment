const { Router } = require('express');
const getRates = require('../api/api');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const data = await getRates();
        let names = Object.keys(data.rates);
        let rates = Object.values(data.rates);

        res.status(200).render('rates', {title: 'Rates', names, rates});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
});

module.exports = router;