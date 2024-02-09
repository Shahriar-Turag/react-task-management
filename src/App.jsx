import { useState } from 'react';

import './App.css';
import { TaskList } from './components/TaskList';

function App() {
	const [tasks, setTasks] = useState([]);

	return (
		<div>
			<h1>Todo List</h1>
			<TaskList />
		</div>
	);
}

export default App;
