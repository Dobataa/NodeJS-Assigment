const { Router } = require('express');

const router = Router();

const ratesController = require('./controllers/ratesController');
const convertController = require('./controllers/convertContoller');

router.use('/rates', ratesController);
router.use('/convert', convertController);
router.get('*', (req, res) => {
    res.render('404', {error: 'Page not found'});
}) 

module.exports = router;