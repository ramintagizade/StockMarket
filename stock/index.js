const fetch = require('isomorphic-fetch');

exports.stock = {
	getStockByTime
};

function getStockByTime(quote,time) {
	
	return new Promise((resolve,reject) => {
		fetch("https://api.iextrading.com/1.0/stock/"+quote+"/chart/1"+time).then(data => {
			return data.json();
		}).then(res => {
			if(res) {
				resolve({ok:true,message:res});
			}
		}).catch(err => {
			reject({ok:false,message:"No such quote available"});
		});
	}); 
}