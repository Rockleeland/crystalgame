import React from 'react';
import './style.css';

function CardLayout(props) {
	const card = props.data;
	return (
		<div>
			<div className='card-layout'>
				<div className='power'>{card.number}</div>
				<div className='title'>{card.title}</div>
				<div className='image-container'>
					<img src={card.image} alt={card.title} />
				</div>
				<div className='text-wrapper'>
					<p className='text'>{card.abilityText}</p>
					<p className='flavor'>{card.flavor}</p>
				</div>
			</div>
		</div>
	);
}

export default CardLayout;
