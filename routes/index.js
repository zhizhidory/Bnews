let express = require('express');
let router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index")
}
);
router.get('/page/:page', function(req, res, next) {
  res.render("index")
}
);

router.get('/:title', function(req, res, next) {
  res.render("news")
}
);
// ([0-9]{8}[-a-zA-Z]*

module.exports = router;