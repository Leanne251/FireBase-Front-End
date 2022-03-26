import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './Login';
import Register from './Register';
import Reset from './Reset';
import Dashboard from './Dashboard';

ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route exact path="/login" element={<Login />} />
			<Route exact path="/" element={<App />} />
			<Route exact path="/register" element={<Register />} />
			<Route exact path="/reset" element={<Reset />} />
			<Route exact path="/dashboard" element={<Dashboard />} />
		</Routes>
	</BrowserRouter>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
