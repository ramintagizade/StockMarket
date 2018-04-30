import {combineReducers} from 'redux';
import {getStockByTime,addStockCode} from "./index";
const rootReducer = combineReducers({
	getStockByTime,addStockCode
});

export default rootReducer;