import socketIOClient from 'socket.io-client';

export function getStockByTime(state={},action) {
	switch(action.type) {
		case "GET_STOCK_TIME_REQUEST" : 
			return {
				getting_stock:true,
				action
			};
		case "GET_STOCK_TIME_SUCCESS" : 
			return {
				got_stock:true,
				stock:action
			};
		case "GET_STOCK_TIME_FAILURE" : 
			return {
				error:action
			}
		default:
			return state;
	}
}

export function addStockCode(state = {}  , action) {
	switch(action.type) {
		case "ADD_STOCK_CODE_REQUEST" : 
			return {
				adding_stock_code: true,
				action
			};
		case "ADD_STOCK_CODE_SUCCESS" : 
			// emit data  
			var protocol = window.location.protocol;
			var host = window.location.host;
			var socket = socketIOClient(protocol+"//"+host);
			socket.emit("add_stock" , action.data);
			
			return {
				added_stock_code:true,
				stock:action.data
			};
		case "ADD_STOCK_CODE_FAILURE" :
			return {
				error:action
			}
		default :
			return state;
	} 
}
export function getAllStocks(state = {}  , action) {
	switch(action.type) {
		case "GET_STOCKS_REQUEST" : 
			return {
				getting_stocks: true,
				action
			};
		case "GET_STOCKS_SUCCESS" : 
			return {
				got_stocks:true,
				stocks:action.data
			};
		case "GET_STOCKS_FAILURE" :
			return {
				error:action
			}
		default :
			return state;
	} 
}
export function removeStock(state = {}  , action) {
	switch(action.type) {
		case "DELETE_STOCK_REQUEST" : 
			return {
				deleting_stock: true,
			};
		case "DELETE_STOCK_SUCCESS" : 
			// emit data  
			var protocol = window.location.protocol;
			var host = window.location.host;
			var socket = socketIOClient(protocol+"//"+host);
			socket.emit("remove_stock" , action.data);

			return {
				deleted_stock:true,
				stock:action
			};
		case "DELETE_STOCK_FAILURE" :
			return {
				error:action
			}
		default :
			return state;
	} 
}
