const { Router } = require('express');

const router = Router();

const ratesController = require('./controllers/ratesController');

router.use('/rates', ratesController);
router.get('*', (req, res) => {
    res.render('404');
}) 

module.exports = router;