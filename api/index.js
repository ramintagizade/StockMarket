var express = require("express");
var stock = require("../stock/index").stock;

module.exports = (() => {
	let api = express.Router();

	api.post("/stock/time/d",function (req,res,next) {
		res.setHeader("Content-Type","application/json");
		stock.getStockByTime(req.body.quote,"d").then(data => {
			if(data) {
				res.send(JSON.stringify(data));
				next();
			}
		}).catch(err => {
			res.send(JSON.stringify(err));
			next();
		});
	});

	api.post("/stock/time/m",function (req,res,next) {
		res.setHeader("Content-Type","application/json");
		stock.getStockByTime(req.body.quote,"m").then(data => {
			if(data) {
				res.send(JSON.stringify(data));
				next();
			}
		}).catch(err => {
			res.send(JSON.stringify(err));
			next();
		});
	});

	api.post("/stock/time/y",function (req,res,next) {
		res.setHeader("Content-Type","application/json");
		stock.getStockByTime(req.body.quote,"y").then(data => {
			if(data) {
				res.send(JSON.stringify(data));
				next();
			}
		}).catch(err => {
			res.send(JSON.stringify(err));
			next();
		});
	});

	return api;
});