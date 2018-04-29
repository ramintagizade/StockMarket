import {stockService} from '../services/index';

export const stockActions = {
	getStockByTime
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