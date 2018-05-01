const fetch = require('isomorphic-fetch');
var stockDB = require("../db/index").stockDB;

exports.stock = {
	getStockByTime,
	addStockCode,
	getAllStocks,
	removeStock
};

function getStockByTime(quote,time) {
	
	return new Promise((resolve,reject) => {
		fetch("https://api.iextrading.com/1.0/stock/"+quote+"/chart/1"+time).then(data => {
			return data.json();
		}).then(res => {
			if(res) {
			
				res = res.map((x,i) => {
					let date = x.minute ? x.date.substr(0,4)+"-"+x.date.substr(4,2)+"-"+x.date.substr(6,2) +" " + x.minute : x.date
					let price = x.high;
					let parseRes = [
						new Date(date).getTime(),
						parseFloat(price)
					];
					return parseRes;
				});
				resolve({ok:true,message:res});
			}
		}).catch(err => {
			reject({ok:false,message:"No such quote available"});
		});
	}); 
}

function addStockCode(code) {
	return new Promise((resolve,reject) => {
		fetch("https://api.iextrading.com/1.0/stock/"+code+"/company").then(data => {
			return data.json();
		}).then(res=> {
			if(res){
				stockDB.insertStock(res).then(db => {
					resolve({ok:true,message:res});
				}).catch(err => {
					reject(err);
				});
			}
		}).catch(err => {
			reject({ok:false,message:"No such code exists"});
		});
	});
}

function getAllStocks() {
	return new Promise((resolve,reject) => {
		stockDB.getAllStocks().then(db => {
			resolve({ok:true,message:db});
		}).catch(err=>{
			reject({ok:false,message:err});
		});
	});
}
function removeStock(symbol) {
	return new Promise((resolve,reject) => {
		stockDB.removeStock(symbol).then(db=> {
			resolve({ok:true,message:db});
		}).catch(err=>{
			reject({ok:false,message:err});
		})
	});
}