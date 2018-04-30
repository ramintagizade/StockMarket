import {combineReducers} from 'redux';
import {getStockByTime,addStockCode,getAllStocks,removeStock} from "./index";
const rootReducer = combineReducers({
	getStockByTime,addStockCode,getAllStocks,removeStock
});

export default rootReducer;