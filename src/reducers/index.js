
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
				action
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
			return {
				added_stock_code:true,
				action
			};
		case "ADD_STOCK_CODE_FAILURE" :
			return {
				error:action
			}
		default :
			return state;
	} 
}