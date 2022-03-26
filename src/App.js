import './App.css';
import { Link } from 'react-router-dom';

function App() {
	return (
		<div className="app">
			<h1>LOGIN PAGE</h1>
			<button>
				<Link to="/login">Login</Link>
			</button>
		</div>
	);
}
export default App;
