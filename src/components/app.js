import React from 'react';
require("../../styles/index.scss");
var Highcharts = require('highcharts/highstock');
import {stockActions} from '../actions/index';
import {connect} from 'react-redux';
import AddStock from "./add_stock";

require('highcharts/modules/exporting')(Highcharts);

class StockMarket extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectRange:"year",
			data : [],
			stocks:[],
			quote:"",
			getDataRender:false,
		};
	}
	componentDidMount() {
		//var socket = socketIOClient("http://localhost:3000");
		//socket.emit("change" , "me");
	}
	componentDidUpdate(prevProps,prevState) {
		if(prevState.selectRange!=this.state.selectRange) {
			this.setState({
				getDataRender:false
			});
			console.log("update");
			let stocks = this.state.stocks;
			for(let i=0;i<stocks.length;i++)
				this.props.dispatch(stockActions.getStockByTime(stocks[i].symbol,this.state.selectRange));
		}
		if(prevProps.getAllStocks!=this.props.getAllStocks && this.props.getAllStocks["got_stocks"]) {
			this.setState({
				stocks:this.props.getAllStocks.stocks.stocks
			},function(){
				let stocks = this.state.stocks;
				for(let i=0;i<stocks.length;i++)
					this.props.dispatch(stockActions.getStockByTime(stocks[i].symbol,this.state.selectRange));
			});
		}
		if(prevProps.getStockByTime!=this.props.getStockByTime && this.props.getStockByTime["got_stock"]) {
			var self = this;
			this.setState({
				data:this.props.getStockByTime.stock.data.stock,
				quote:this.props.getStockByTime.stock.data.quote
			},function(){
		
				if(!this.state.getDataRender) {
					this.getData(); 
					this.setState({
						getDataRender:true
					});
				}
				this.chart.addSeries({                        
				    name: this.state.quote,
				    data: this.state.data,
				}, false);
				this.chart.redraw();
			});

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
			            text: 'Stocks'
			        },
			        
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
			<div>
			<div id="container"></div>
				<AddStock />
			</div>
		);
	}
}
function mapStateToProps(state) {
	const {getStockByTime,getAllStocks} = state;
	return {
		getStockByTime,getAllStocks
	};
}
StockMarket = connect(mapStateToProps)(StockMarket);
export default StockMarket;