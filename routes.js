const { Router } = require('express');

const router = Router();

const ratesController = require('./controllers/ratesController');

router.use('/rates', ratesController);

module.exports = router;