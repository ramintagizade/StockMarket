import React from 'react';
import ReactDOM from 'react-dom';
import StockMarket from './components/app';
import store from './helpers/store';
import {Provider} from 'react-redux';

ReactDOM.render(
	<Provider store= {store}>
		<StockMarket/>
	</Provider>,
	document.getElementById("root")
);