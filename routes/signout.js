var express = require('express');
var router = express.router();

var checkLogin = require('../middlewares/check').checkLogin;

// GET /signin 登出
router.get('/', checkNotLogin, function(req, res, next) {
	res.send(req.flash());
});

module.exports = router;