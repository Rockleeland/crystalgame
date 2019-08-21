const cards = require('../card/card')

// An api endpoint that returns a short list of items
module.exports = {
    cards: function(req, res) {
        const list = cards;
        res.json(list);
    }
}

