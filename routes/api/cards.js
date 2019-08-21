const router = require('express').Router();
const cardsController = require('../../controllers/cardsController');

router
    .route('/getLists')
    .get(cardsController.cards);

module.exports = router;
