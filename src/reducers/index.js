
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