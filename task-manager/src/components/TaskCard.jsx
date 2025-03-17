
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask } from '../features/tasksSlice'
import { useNavigate } from 'react-router-dom'

function TaskCard({ task }) {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { token } = useSelector(state => state.auth)

	const handleDelete = () => {
		dispatch(deleteTask({ id: task.id, token }))
	}

	return (
        // Выводим информацию о задаче
		<div style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
			<h3>{task.title}</h3>
			<p>{task.description}</p>
			<p>Статус: {task.status}</p>
			<p>Дедлайн: {new Date(task.dueDate).toLocaleString()}</p>
			{task.tags && task.tags.map((tag, i) => <span key={i}>#{tag} </span>)}
			<div>
				<button onClick={() => navigate(`/edit/${task.id}`)}>
					Редактировать
				</button>
				<button onClick={handleDelete}>Удалить</button>
			</div>
		</div>
	)
}

export default TaskCard
