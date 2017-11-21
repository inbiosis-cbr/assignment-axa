var config = require('config');
var cryptoJS = require('crypto-js');
var express = require('express');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var router = express.Router();

const { celebrate, Joi, errors } = require('celebrate');
const EXPIRY_IN_MINUTES = config.get('server.auth.expiry_in_minutes');
const TOKEN_SALT = config.get('server.auth.secret');

// Type 3: Persistent datastore with automatic loading
var Datastore = require('nedb'),
	db = new Datastore({ filename: 'database.dat', autoload: true });

/* POST user/auth */
router.post('/user/auth', 
	celebrate({
		body: Joi.object().keys({
			username: Joi.string().required(),
			password: Joi.string().required(),
			insert: Joi.string(),
		}),
	}),
	function(req, res, next) {

		//Do db import
		var doc = { 
			username: req.body.username,
			password: req.body.password,
		};

		var found = false;
		db.findOne(doc, function (err, docs) {
			if(err){
				res.send(JSON.stringify({
					error: 'Username not found.'
				}));
			}
			if(docs.length == 0){

				if(req.body.insert == undefined){
					console.log('No insert flag for new insert.');
					return;
				}

				if(req.body.insert != undefined){
					db.insert(doc, function (err, newDoc) {
						console.log(newDoc);
					});
				}
			} else {
				console.log(docs);
				found = true;
			}

			if(found){
				//Sign a token
				var token = jwt.sign({
					exp: parseInt(moment().minute(EXPIRY_IN_MINUTES)),
					data: JSON.stringify(req.body.username + "::" + req.body.password)
				}, TOKEN_SALT);

				var out = {
					username: req.body.username,
					password: req.body.password,
					token: token,
					status: 'hit'
				};			
			} else {
				var out = {
					error: 'Auth failed, record not found.'
				};			
			}

			res.send(JSON.stringify(out));
		});
});

router.use(errors());

module.exports = router;
