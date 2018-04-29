export const stockService = {
	getStockByTime
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
		console.log("rece " + JSON.stringify(data));
		return data;
	});
}