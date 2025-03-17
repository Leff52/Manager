// backend/server.js
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const SECRET_KEY = 'leff52' // Секретный ключ для подписи JWT

let tasks = []
let users = []

// Middleware для проверки JWT
function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if (!token) return res.sendStatus(401)

	jwt.verify(token, SECRET_KEY, (err, user) => {
		if (err) return res.sendStatus(403)
		req.user = user // payload из токена
		next()
	})
}
// Получить все задачи
app.get('/tasks', authenticateToken, (req, res) => {
	res.json(tasks)
})

// Создать новую задачу
app.post('/tasks', authenticateToken, (req, res) => {
	const newTask = {
		id: Date.now().toString(),
		...req.body,
		createdAt: new Date(),
		updatedAt: new Date(),
	}
	tasks.push(newTask)
	res.status(201).json(newTask)
})

// Обновить задачу
app.put('/tasks/:id', authenticateToken, (req, res) => {
	const { id } = req.params
	const index = tasks.findIndex(t => t.id === id)
	if (index === -1) return res.sendStatus(404)
	tasks[index] = { ...tasks[index], ...req.body, updatedAt: new Date() }
	res.json(tasks[index])
})

// Удалить задачу
app.delete('/tasks/:id', authenticateToken, (req, res) => {
	const { id } = req.params
	tasks = tasks.filter(t => t.id !== id)
	res.sendStatus(204)
})

// Регистрация
app.post('/register', (req, res) => {
	const { username, email, password } = req.body
	const newUser = {
		id: Date.now().toString(),
		username,
		email,
		password,
		createdAt: new Date(),
	}
	users.push(newUser)
	// Генерация JWT
	const token = jwt.sign(
		{ id: newUser.id, username: newUser.username },
		SECRET_KEY
	)
	res.status(201).json({ token, user: newUser })
    console.log('Register body:', req.body)

})

// Логин
app.post('/login', (req, res) => {
	const { username, password } = req.body
	const user = users.find(
		u => u.username === username && u.password === password
	)
	if (!user) return res.status(400).json({ error: 'Неверные учетные данные' })
	const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY)
	res.json({ token, user })
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
