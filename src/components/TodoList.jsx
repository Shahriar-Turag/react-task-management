// TodoList.js
import { useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { FaCheck, FaEdit } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';

function TodoList() {
	const [tasks, setTasks] = useState([]);
	const [taskName, setTaskName] = useState('');
	const [taskDescription, setTaskDescription] = useState('');
	const [priority, setPriority] = useState('low');
	const [editingIndex, setEditingIndex] = useState(null);
	const [editingTaskName, setEditingTaskName] = useState('');
	const [editingPriority, setEditingPriority] = useState('low');
	const [editingTaskDescription, setEditingTaskDescription] = useState('');

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
				{
					name: taskName,
					status: false,
					priority: priority,
					description: taskDescription,
				},
			]);
			setTaskName('');
		}
	};

	const handleEditTask = (index) => {
		setEditingIndex(index);
		setEditingTaskName(tasks[index].name);
		setEditingPriority(tasks[index].priority);
		setEditingTaskDescription(tasks[index].description);
		const editModal = document.getElementById('edit_modal');
		if (editModal) {
			editModal.showModal();
		}
	};

	const handleUpdateTask = () => {
		setTasks((prevTasks) =>
			prevTasks.map((task, i) =>
				i === editingIndex
					? {
							...task,
							name: editingTaskName,
							priority: editingPriority,
							description: editingTaskDescription,
					  }
					: task
			)
		);
		const editModal = document.getElementById('edit_modal');
		if (editModal) {
			editModal.close();
		}
	};

	console.log(tasks);

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
						className='btn btn-accent'
						onClick={() =>
							document.getElementById('my_modal_1').showModal()
						}
					>
						Add new Task <IoMdAdd />
					</button>
					<dialog id='my_modal_1' className='modal'>
						<div className='modal-box'>
							<h3 className='font-bold text-lg mb-5'>
								Add your task
							</h3>
							<div className='flex flex-col gap-5'>
								<input
									className='input input-bordered input-primary w-full'
									placeholder='Task name'
									type='text'
									value={taskName}
									onChange={(e) =>
										setTaskName(e.target.value)
									}
								/>
								<textarea
									className='textarea textarea-primary'
									placeholder='Task description'
									onChange={(e) =>
										setTaskDescription(e.target.value)
									}
								></textarea>
								<select
									className='select select-bordered select-primary w-full '
									onChange={(e) =>
										setPriority(e.target.value)
									}
								>
									<option value='low'>Low</option>
									<option value='medium'>Medium</option>
									<option value='high'>High</option>
								</select>
								<button
									className='btn btn-accent'
									onClick={handleAddTask}
								>
									Add Task
								</button>
							</div>
							<div className='modal-action'>
								<form method='dialog'>
									<button className='btn btn-error'>
										Close
									</button>
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
							<th>Description</th>
							<th>Priority</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{tasks.map((task, index) => (
							<tr key={index}>
								<td className='flex items-center gap-2'>
									{task.name}
									{task.status === true && (
										<FaCheck className='text-emerald-500' />
									)}{' '}
								</td>
								<td className=''>{task.description}</td>
								<td>
									<p
										className={
											task.priority === 'high'
												? 'bg-red-500 w-16 text-center text-white rounded-xl'
												: task.priority === 'medium'
												? 'bg-yellow-500 w-16 text-center text-white rounded-xl'
												: 'bg-green-500 w-16 text-center text-white rounded-xl'
										}
									>
										{task.priority}
									</p>
								</td>
								<td>
									<button
										className={
											task.status === true
												? 'btn btn-sm btn-accent !ring-0 !outline-none'
												: 'btn btn-sm btn-primary'
										}
										onClick={() =>
											handleToggleTaskStatus(index)
										}
									>
										{task.status
											? 'Mark Incomplete'
											: 'Mark Complete'}
									</button>
								</td>
								<td className='flex gap-2'>
									<div
										className='btn btn-sm btn-accent !ring-0 !outline-none'
										onClick={() => handleEditTask(index)}
									>
										<FaEdit
											className='text-white text-center'
											size={20}
										/>
									</div>
									<div
										className='btn btn-sm btn-error !ring-0 !outline-none'
										onClick={() => handleDeleteTask(index)}
									>
										<MdDeleteForever
											className='text-white text-center'
											size={25}
										/>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div>
				<dialog id='edit_modal' className='modal'>
					<div className='modal-box'>
						<h3 className='font-bold text-lg'>Edit Task</h3>
						<div className='flex flex-col items-center'>
							<input
								className='input input-bordered input-primary w-full max-w-xs'
								placeholder='Task name'
								type='text'
								value={editingTaskName}
								onChange={(e) =>
									setEditingTaskName(e.target.value)
								}
							/>
							<select
								className='select select-bordered select-primary w-full max-w-xs mt-2'
								value={editingPriority}
								onChange={(e) =>
									setEditingPriority(e.target.value)
								}
							>
								<option value='low'>Low</option>
								<option value='medium'>Medium</option>
								<option value='high'>High</option>
							</select>
							<button className='btn' onClick={handleUpdateTask}>
								Update Task
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
		</div>
	);
}

export default TodoList;
