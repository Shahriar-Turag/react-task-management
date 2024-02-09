// TodoList.js
import { useEffect, useState } from 'react';

function TodoList() {
	const [tasks, setTasks] = useState([]);
	const [taskName, setTaskName] = useState('');

	useEffect(() => {
		const storedTasks = JSON.parse(localStorage.getItem('tasks'));
		if (storedTasks) {
			setTasks(storedTasks);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	const handleAddTask = () => {
		if (taskName.trim() !== '') {
			setTasks((prevTasks) => [
				...prevTasks,
				{ name: taskName, status: false },
			]);
			setTaskName('');
		}
	};

	const handleDeleteTask = (index) => {
		setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
	};

	const handleToggleTaskStatus = (index) => {
		setTasks((prevTasks) =>
			prevTasks.map((task, i) =>
				i === index ? { ...task, status: !task.status } : task
			)
		);
	};

	return (
		<div>
			<div className='flex justify-between'>
				<div>
					<button
						className='btn'
						onClick={() =>
							document.getElementById('my_modal_1').showModal()
						}
					>
						Add new Task
					</button>
					<dialog id='my_modal_1' className='modal'>
						<div className='modal-box'>
							<h3 className='font-bold text-lg'>Add your task</h3>
							<div className='flex flex-col items-center'>
								<input
									className='input input-bordered input-primary w-full max-w-xs'
									placeholder='Task name'
									type='text'
									value={taskName}
									onChange={(e) =>
										setTaskName(e.target.value)
									}
								/>
								<button className='btn' onClick={handleAddTask}>
									Add Task
								</button>
							</div>
							<div className='modal-action'>
								<form method='dialog'>
									<button className='btn'>Close</button>
								</form>
							</div>
						</div>
					</dialog>
				</div>
				<div>
					<p>Total Tasks: {tasks.length}</p>
					<p>
						Completed Tasks:{' '}
						{tasks.filter((task) => task.status).length}
					</p>
				</div>
			</div>
			<div>
				<h2 className='text-xl font-bold'>Task Table</h2>
				<table className='w-full table table-zebra'>
					<thead>
						<tr>
							<th>Task</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{tasks.map((task, index) => (
							<tr key={index}>
								<td
									style={{
										textDecoration: task.status
											? 'line-through'
											: 'none',
									}}
								>
									{task.name}
								</td>
								<td>
									<button
										onClick={() =>
											handleToggleTaskStatus(index)
										}
									>
										{task.status
											? 'Mark Incomplete'
											: 'Mark Complete'}
									</button>
								</td>
								<td>
									<button
										onClick={() => handleDeleteTask(index)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default TodoList;
