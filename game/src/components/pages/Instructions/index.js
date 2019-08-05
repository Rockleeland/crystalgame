import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardLayout from '../../CardLayout'
import './style.css'


class Instructions extends React.Component {
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

		const cards = this.state.list;
		console.log(cards)
		return (
			<div>
				<h1>How To Play</h1>
				{cards.length ? (
					<Container>
						<Row>
						{cards.map((card) => {
							
							return(
									<Col  xs={12} key={cards.indexOf(card)}>
										<CardLayout data={card} />
									</Col>
							)
						})}
						</Row>
					</Container>
				) : (
					null
					)}
			</div>

		)
	}
}


export default Instructions