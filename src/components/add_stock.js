import React from 'react';
import {connect} from 'react-redux';
import {stockActions} from '../actions/index';

class AddStock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stocks:[],
			add_stock:""
		};
		this.handleChange = this.handleChange.bind(this);
		this.submit = this.submit.bind(this);
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
	render() {
		var stocks = this.state.stocks.map(function (stk , i) {
			return <div className="stock" key={i}> 
				<p> Stock Name </p>
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
	const {add_stock} = state;
	return {
		add_stock
	};
}

AddStock = connect(mapStateToProps)(AddStock);
export default AddStock;