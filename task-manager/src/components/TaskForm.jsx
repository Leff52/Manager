import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, updateTask, loadTasks } from '../features/tasksSlice'
import { useNavigate, useParams } from 'react-router-dom'

function TaskForm() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()
	const { items } = useSelector(state => state.tasks)
	const { token } = useSelector(state => state.auth)
	// Стейт для хранения данных формы
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		status: 'новая',
		dueDate: '',
		tags: [],
	})
	const [tagInput, setTagInput] = useState('')

	useEffect(() => {
		if (id && items.length) {
			const existing = items.find(t => t.id === id)
			if (existing) {
				setFormData(existing)
			}
		}
	}, [id, items])

	const handleSubmit = e => {
		e.preventDefault()
		if (!token) return

		if (id) {
			dispatch(updateTask({ id, task: formData, token }))
		} else {
			dispatch(addTask({ task: formData, token }))
		}
		dispatch(loadTasks(token))
		navigate('/')
	}

	const addTag = () => {
		if (tagInput && !formData.tags.includes(tagInput)) {
			setFormData({ ...formData, tags: [...formData.tags, tagInput] })
			setTagInput('')
		}
	}

	return (
		<form onSubmit={handleSubmit} style={{ margin: 20 }}>
			<h2>{id ? 'Редактировать задачу' : 'Создать задачу'}</h2>
			<div>
				<label>Название:</label>
				<input
					type='text'
					value={formData.title}
					onChange={e => setFormData({ ...formData, title: e.target.value })}
					required
				/>
			</div>
			<div>
				<label>Описание:</label>
				<textarea
					value={formData.description}
					onChange={e =>
						setFormData({ ...formData, description: e.target.value })
					}
					required
				/>
			</div>
			<div>
				<label>Статус:</label>
				<select
					value={formData.status}
					onChange={e => setFormData({ ...formData, status: e.target.value })}
				>
					<option value='новая'>Новая</option>
					<option value='в процессе'>В процессе</option>
					<option value='завершена'>Завершена</option>
				</select>
			</div>
			<div>
				<label>Дедлайн:</label>
				<input
					type='datetime-local'
					value={formData.dueDate}
					onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
				/>
			</div>
			<div>
				<label>Теги:</label>
				<input
					type='text'
					value={tagInput}
					onChange={e => setTagInput(e.target.value)}
				/>
				<button type='button' onClick={addTag}>
					Добавить тег
				</button>
			</div>
			<div>
				{formData.tags.map((tag, i) => (
					<span key={i}>#{tag} </span>
				))}
			</div>
			<button type='submit'>
				{id ? 'Сохранить изменения' : 'Создать задачу'}
			</button>
		</form>
	)
}

export default TaskForm
