
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadTasks } from '../features/tasksSlice'
import TaskCard from './TaskCard'
import { useNavigate } from 'react-router-dom'

function TaskList() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { items, status } = useSelector(state => state.tasks)
	const { token } = useSelector(state => state.auth)

	useEffect(() => {
		if (token) {
			dispatch(loadTasks(token))
		}
	}, [dispatch, token])

	if (!token) {
		return (
			<div>
				Вы не авторизованы.{' '}
				<button onClick={() => navigate('/login')}>Войти</button>
			</div>
		)
	}

	if (status === 'loading') return <div>Загрузка...</div>
	if (status === 'failed') return <div>Ошибка загрузки задач</div>

	return (
		<div className="body"style={{ padding: '20px' }}>
			<button onClick={() => navigate('/new')}>Создать задачу</button>
			<h2 >Список задач</h2>
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				{items.map(task => (
					<TaskCard key={task.id} task={task} />
				))}
			</div>
		</div>
	)
}

export default TaskList
