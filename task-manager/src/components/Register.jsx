
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../features/authSlice'
import { useNavigate } from 'react-router-dom'

function Register() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [form, setForm] = useState({ username: '', email: '', password: '' })
	const { token, status } = useSelector(state => state.auth)

	const handleSubmit = async e => {
		e.preventDefault()
		const result = await dispatch(registerUser(form))
		if (result.meta.requestStatus === 'fulfilled') {
			navigate('/')
		}
	}

	if (token) {
		return (
			<div>
				Вы уже авторизованы.{' '}
				<button onClick={() => navigate('/')}>На главную</button>
			</div>
		)
	}

	return (
		<form onSubmit={handleSubmit} style={{ margin: 'auto',padding:'auto' }} >
			<h2>Регистрация</h2>
			<div>
				<label>Имя пользователя:</label>
				<input
					value={form.username}
					onChange={e => setForm({ ...form, username: e.target.value })}
					required
				/>
			</div>
			<div>
				<label>Email:</label>
				<input
					type='email'
					value={form.email}
					onChange={e => setForm({ ...form, email: e.target.value })}
					required
				/>
			</div>
			<div>
				<label>Пароль:</label>
				<input
					type='password'
					value={form.password}
					onChange={e => setForm({ ...form, password: e.target.value })}
					required
				/>
			</div>
			<button type='submit'>Зарегистрироваться</button>
			{status === 'failed' && (
				<p style={{ color: 'red' }}>Ошибка при регистрации</p>
			)}
		</form>
	)
}

export default Register
