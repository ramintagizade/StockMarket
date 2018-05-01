import React from 'react';
import {connect} from 'react-redux';
import {stockActions} from '../actions/index';
import socketIOClient from 'socket.io-client';

var protocol = window.location.protocol;
var host = window.location.host;
var socket = socketIOClient(protocol+"//"+host);

class AddStock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stocks:[],
			add_stock:"",
			gotStocksState:false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.submit = this.submit.bind(this);
		this.handleSocketAddStock = this.handleSocketAddStock.bind(this);
		this.handleSocketRemoveStock = this.handleSocketRemoveStock.bind(this);
	}

	componentDidMount() {
		this.props.dispatch(stockActions.getAllStocks());
		socket.on("add_stock", this.handleSocketAddStock);
		socket.on("remove_stock",this.handleSocketRemoveStock);
	}
	componentDidUpdate(prevProps,prevState) {
		if((prevProps.addStockCode!=this.props.addStockCode) && this.props.addStockCode["added_stock_code"]) {
			let stocks = [...this.state.stocks];
			const {symbol,companyName,industry} = this.props.addStockCode.stock.code;
			stocks.push({symbol,companyName,industry});
			this.setState({
				stocks:stocks,
			});
		}
		
		if(!this.state.gotStocksState && (prevProps.stocks!=this.props.getAllStocks) && this.props.getAllStocks["got_stocks"]) {
			let stocks = this.props.getAllStocks.stocks.stocks;
			this.setState({
				stocks:stocks,
				gotStocksState:true
			});
		}
		if(prevProps.removeStock!=this.props.removeStock && this.props.removeStock["deleted_stock"]){
			let symbol = this.props.removeStock.stock.data.symbol;
			let stocks = [...this.state.stocks];
			stocks = stocks.filter((x)=> {
				return symbol!=x.symbol;
			});
			this.setState({
				stocks:stocks
			});
		}
		
	}
	handleChange(e) {
		let {value}  = e.target;
		this.setState({
			add_stock:value
		});
	}
	submit() {
		let stockCode = this.state.add_stock;
		if(stockCode) 
			this.props.dispatch(stockActions.addStockCode(stockCode));
	}
	removeStock(i) {
		
		let stocks = [...this.state.stocks];
		this.props.dispatch(stockActions.removeStock(stocks[i].symbol));
		
	}
	componentWillUnmount() {
		socket.removeListener('add_stock',this.handleSocketAddStock);
		socket.removeListener("remove_stock",this.handleSocketRemoveStock);
	}
	handleSocketAddStock(data) {
		let stocks = [...this.state.stocks];
		const {symbol,companyName,industry} = data.code;
		
		let exists = stocks.filter(x=> {
			return symbol==x.symbol
		});
		if(!exists.length) {
			stocks.push({symbol,companyName,industry});
			this.setState({
				stocks:stocks
			});
		}
	}
	handleSocketRemoveStock(data){
		let symbol = data.symbol;
		let stocks = [...this.state.stocks];
		stocks = stocks.filter((x)=> {
			return symbol!=x.symbol;
		});
		this.setState({
			stocks:stocks
		});
	}
	render() {
		
		var self = this;
		var stocks = this.state.stocks.map(function (stk , i) {
			return <div className="stock" key={i}> 
				<button type="button" className="close" onClick={self.removeStock.bind(self,i)}>×</button>	
				<p> <strong>{stk && stk.symbol} </strong></p>
				<p>{stk && stk.companyName },{stk &&  stk.industry }</p>
			</div>
		});

		return (
			<div> 
				<div className="stocks">
					{stocks}
				</div>
				<div className="add_stock">
					<div className="form-group">
						<label htmlFor="add_stock">Sync in Real Time </label>
				    	<input type="text" className="form-control" name="add_stock" id="add_stock" 
				    	aria-describedby="usernameHelp" placeholder="Stock Code" onChange={this.handleChange}/>
						<button className="btn btn-success" onClick={this.submit}> Add </button>
					</div>	
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const {addStockCode,getAllStocks,removeStock} = state;
	return {
		addStockCode,getAllStocks,removeStock
	};
}

AddStock = connect(mapStateToProps)(AddStock);
export default AddStock;