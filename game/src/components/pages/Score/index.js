import React from 'react';
import { connect } from 'react-redux';


class Score extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			list: []
		}
	};
	
	componentWillMount() {
		
		this.getList();
	}

	getList = () => {
		
		fetch('/api/getList')
		.then(res => res.json())
		.then(list => this.setState({list}))
	}

	render(){
		const { list } = this.state;
console.log(this.state)
		return (
			<div>
				<h1>{this.props.name}'s High Score!</h1>
				{list.length ? (
					<div>
						{list.map((item) => {
							return (
								<div key={list.indexOf(item)}>
									{item}
								</div>
							)
						})}
					</div>
				) : (
					<div>
						<h2>No Scores Yet</h2>
					</div>
				)}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	name: state.name
  })

export default connect(mapStateToProps)(Score)