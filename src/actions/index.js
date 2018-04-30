import {stockService} from '../services/index';

export const stockActions = {
	getStockByTime,
	addStockCode
};

function getStockByTime(quote,time) {
	return dispatch => {
		dispatch(request({quote,time}));
		stockService.getStockByTime(quote,time).then(data => {
			if(data.ok) {
				dispatch(success(data.message));
			}
			else {
				dispatch(failure(data.message));
			}
		});
	}

	function request(time) {
		return {
			type:"GET_STOCK_TIME_REQUEST",
			stock : {quote,time}
		};
	}

	function success(stock) {
		return {
			type:"GET_STOCK_TIME_SUCCESS",
			data: {quote,stock} 
		};
	}

	function failure(err) {
		return {
			type:"GET_STOCK_TIME_FAILURE",
			err
		};
	}
}
function addStockCode(code) {
	return dispatch => {
		dispatch(request(code));
		stockService.addStockCode(code).then(data  => {
			if(data.ok) {
				dispatch(success(data.message));
			}
			else {
				dispatch(failure(data.message));
			}
		});
	}

	function request(code) {
		return {
			type:"ADD_STOCK_CODE_REQUEST",
			stock : {code}
		};
	}

	function success(code) {
		return {
			type:"ADD_STOCK_CODE_SUCCESS",
			data: {code} 
		};
	}

	function failure(err) {
		return {
			type:"ADD_STOCK_CODE_FAILURE",
			err
		};
	}
}