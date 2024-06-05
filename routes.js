const { Router } = require('express');

const router = Router();

const ratesController = require('./controllers/ratesController');
const convertController = require('./controllers/convertContoller');

router.use('/rates', ratesController);
router.use('/convert', convertController);
router.get('*', (req, res) => {
    res.status(404).json({error: 'Page not found'} );
}) 

module.exports = router;