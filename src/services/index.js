export const stockService = {
	getStockByTime,
	addStockCode,
	getAllStocks,
	removeStock
};

function getStockByTime(quote,time) {
	
	const opts = {
		method:"POST",
		headers: {"Content-Type": "application/json"},
		body:JSON.stringify({quote})
	};
	let times = {
		"hour":"d",
		"day":"m",
		"year":"y"
	};
	return fetch("/stock/time/"+times[time],opts).then(res => {
		if(!res.ok) {
			return Promise.reject(res.statusText);
		}
		return res.json();	
	}).then(data => {
		return data;
	});
}

function addStockCode(code) {
	const opts = {
		method:"POST",
		headers: {"Content-Type": "application/json"},
		body:JSON.stringify({code})
	};
	return fetch("/addStockCode",opts).then(res => {
		if(!res.ok) {
			return Promise.reject(res.statusText);
		}
		return res.json();
	}).then(data => {
		return data;
	});
}
function getAllStocks() {
	const opts = {
		method:"POST",
		headers: {"Content-Type": "application/json"},
		body:JSON.stringify({})
	};
	return fetch("/allStocks",opts).then(res => {
		if(!res.ok) {
			return Promise.reject(res.statusText);
		}
		return res.json();
	}).then(data => {
		return data;
	});
}
function removeStock(symbol) {
	const opts = {
		method:"DELETE",
		headers: {"Content-Type": "application/json"},
		body:JSON.stringify({symbol})
	};
	return fetch("/deleteStock/id",opts).then(res => {
		if(!res.ok) {
			return Promise.reject(res.statusText);
		}
		return res.json();
	}).then(data => {
		return data;
	});
}