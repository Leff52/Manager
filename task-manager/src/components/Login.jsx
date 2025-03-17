import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/authSlice'
import { useNavigate } from 'react-router-dom'

function Login() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [credentials, setCredentials] = useState({ username: '', password: '' })
	const { token, status } = useSelector(state => state.auth)

	const handleSubmit = async e => {
		e.preventDefault()
		const result = await dispatch(loginUser(credentials))
		if (result.meta.requestStatus === 'fulfilled') {
			navigate('/')
		}
	}

	if (token) {
		return (
			<div style={{ 
				width: '100%',
				display: 'flex', 
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh'
			}}>
				<div style={{ marginBottom: 15, fontSize: '18px' }}>Вы уже авторизованы.</div>
				<div>
					<button 
						onClick={() => navigate('/')}
						style={{ padding: '8px 16px', cursor: 'pointer' }}
					>
						На главную
					</button>
				</div>
			</div>
		)
	}

	return (
		<div
			style={{
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
			}}
		>
			<form
				onSubmit={handleSubmit}
				style={{ width: '300px', textAlign: 'center' }}
			>
				<h2>Вход</h2>
				<div>
					<label>Имя пользователя:</label>
					<input
						value={credentials.username}
						onChange={e =>
							setCredentials({ ...credentials, username: e.target.value })
						}
						required
					/>
				</div>
				<div>
					<label>Пароль:</label>
					<input
						type='password'
						value={credentials.password}
						onChange={e =>
							setCredentials({ ...credentials, password: e.target.value })
						}
						required
					/>
				</div>
				<div>
					<button type='submit'>Войти</button>
					{status === 'failed' && (
						<p style={{ color: 'red' }}>Ошибка при входе</p>
					)}
				</div>
			</form>
		</div>
	)
}

export default Login
