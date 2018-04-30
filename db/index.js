var MongoClient = require("mongodb").MongoClient;
var ObjectId = require('mongodb').ObjectID;

var db_name = process.env.Db_Name || 'stock-market';
var db_host = process.env.Db_Host || 'localhost';
var db_port = process.env.Db_Port || '27017';
if(process.env.NODE_ENV !== 'production')
	var url = 'mongodb://'+db_host+':'+db_port;
else {
	var dbuser = process.env.user;
	var dbpassword = process.env.password;
	var url = "mongodb://"+dbuser+":"+dbpassword+"@ds261929.mlab.com:61929/stock-market";
}	
var db = null;
var client = null;

MongoClient.connect(url, function(err, client) {
  if(err) console.log(err);
  db = client.db(db_name);
  client = client;
});

exports.stockDB = {
	insertStock,
	getAllStocks,
	removeStock
};

function insertStock(obj) {
	const {symbol,companyName,industry} = obj;
	const newObj = {
		symbol,companyName,industry
	};
	return new Promise((resolve,reject) => {

		db.collection("stocks").findOne({symbol:symbol},function (err,res){
			if(res){
				reject({ok:false,message:"Symbol already exists "});
			}
			else {
				db.collection("stocks").insertOne(newObj,function(err,res){
					if(err) reject({ok:false,message:"Cannot add stock"});
					if(res){
						resolve({ok:true,message:"Stock added"});
					}
				});
			}
		});
	});
}
function getAllStocks() {
	return new Promise((resolve,reject) => {
		db.collection("stocks").find({}).toArray(function(err,res){
			if(err) reject(err);
			if(res){
				resolve(res);
			}
		});
	});
}

function removeStock(symbol) {
	return new Promise((resolve,reject) => {
		db.collection("stocks").remove({symbol:symbol},function(err,res){
			if(err) reject("Cannot remove");
			if(res) {
				resolve({msg:"Stock removed",symbol});
			}
		});
	});
}