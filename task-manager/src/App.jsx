
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import CalendarView from './components/CalendarView'
import Login from './components/Login'
import Register from './components/Register'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<TaskList />} />
				<Route path='/new' element={<TaskForm />} />
				<Route path='/edit/:id' element={<TaskForm />} />
				<Route path='/calendar' element={<CalendarView />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</Router>
	)
}

export default App
