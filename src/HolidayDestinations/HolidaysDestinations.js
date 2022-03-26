import React from 'react';

function HolidayDestinations({ value, onClick }) {
	return (
		<div>
			<p>{value}</p>
			<button onClick={onClick}>Clear Destination!</button>
		</div>
	);
}

export default HolidayDestinations;
