import React from 'react';
require("../../styles/index.scss");
var Highcharts = require('highcharts/highstock');
import {stockActions} from '../actions/index';
import {connect} from 'react-redux';

require('highcharts/modules/exporting')(Highcharts);

class StockMarket extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectRange:"hour",
			data : [
				[new Date("2018-04-27 15:58:00").getTime(),
	           	parseFloat("95.8350")],
	        	[new Date("2018-04-27 15:59:00").getTime(), 
	            parseFloat("95.8800")],
	        	[new Date("2018-04-27 16:00:00").getTime(), 
	            parseFloat("95.9900")]
			]
		};
	}
	componentDidMount() {
		//addFunnel(Highcharts);
		this.getData();
	}
	componentDidUpdate(prevProps,prevState) {
		if(prevState.selectRange!=this.state.selectRange) {
			console.log("update");
			//this.chart.series[0].setData(this.state.data,true);
			this.props.dispatch(stockActions.getStockByTime("gold",this.state.selectRange));
		}
	} 
	getData() {
			var self = this; 
			this.chart = Highcharts.stockChart('container', {
			        rangeSelector: {
			            selected: 1,
			            enabled:true,
			            inputEnabled: true,
			            allButtonsEnabled: true,
			             buttons: [{
			                type: 'hour',
			                count: 1,
			                text: '1h'
			            }, {
			                type: 'day',
			                count: 1,
			                text: '1d'
			            }, {
			                type: 'year',
			                count: 1,
			                text: '1y'
			            }],
			        },

			        title: {
			            text: 'AAPL Stock Price'
			        },

			        series: [{
			            name: 'AAPL',
			            data: self.state.data,
			            tooltip: {
			                valueDecimals: 2
			            }
			        }],
			        xAxis: {
				    	events: {
				    		setExtremes: function(e) {
			                    if(typeof(e.rangeSelectorButton)!== 'undefined')
			                    {
			                     
			                      	console.log("true")
			                      	self.setState({
			                      	 	selectRange:e.rangeSelectorButton.type
			                      	 });
			                     
			                    }
				    		}
				    	}
				    },
			    });

			

	}
	render() {
		return (
			<div id="container"></div>
		);
	}
}
function mapStateToProps(state) {
	const {getStockByTime} = state;
	return {
		getStockByTime
	};
}
StockMarket = connect(mapStateToProps)(StockMarket);
export default StockMarket;