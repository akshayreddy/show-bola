let express = require('express');
let router = express.Router();

// GET cards page. 
router.get('/', function(req, res, next) {
  res.render('card');
});

module.exports = router;
