var express = require('express');
var CryptoJS = require('crypto-js');
var jwt = require('jsonwebtoken');
var router = express.Router();

const { celebrate, Joi, errors } = require('celebrate');

// Type 3: Persistent datastore with automatic loading
var Datastore = require('nedb'),
	db = new Datastore({ filename: 'database.dat', autoload: true });

/* POST user/auth */
router.post('/user/auth', 
	celebrate({
		body: Joi.object().keys({
			username: Joi.string().required(),
			password: Joi.string().required(),
		}),
	}),
	function(req, res, next) {
		var out = {
			username: req.body.username,
			password: req.body.password,
			token: null,
			status: 'hit'  	
		};
		res.send(JSON.stringify(out));
});

router.use(errors());

module.exports = router;
