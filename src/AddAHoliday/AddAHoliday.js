import React from 'react';
import { useState } from 'react';

function AddAHoliday({ user }) {
	console.log('user addHoliday', user);
	const [ newHoliday, setNewHoliday ] = useState({ userID: user.accessToken });

	function getInput(e) {
		let value = e.target.value;
		setNewHoliday({ ...newHoliday, [e.target.name]: value });
	}

	async function sendPostRequest() {
		console.log('newHoliday inside send', newHoliday);
		let authToken = user.accessToken;
		// let authToken = sessionStorage.getItem('Auth Token');
		// console.log('in function authnewHoliday', authToken);
		const response = await fetch(`http://localhost:8000/holidays/`, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + authToken
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(newHoliday)
		});
		console.log(response);
		const data = await response.json();
		console.log(data, 'data');
	}

	return (
		<div>
			<label>Sending Data to the Database</label>
			<input type="text" name="destination" placeholder="destination" onChange={getInput} />
			<input type="text" name="style" placeholder="style" onChange={getInput} />
			<input type="text" name="price" placeholder="price" onChange={getInput} />
			<button onClick={sendPostRequest}>Send</button>
		</div>
	);
}

export default AddAHoliday;

//PLAN

// create some input boxes for the object: destination, style, price.
