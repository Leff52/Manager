
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadTasks } from '../features/tasksSlice'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

function CalendarView() {
	const dispatch = useDispatch()
	const { items } = useSelector(state => state.tasks)
	const { token } = useSelector(state => state.auth)

	useEffect(() => {
		if (token) {
			dispatch(loadTasks(token))
		}
	}, [dispatch, token])

	const events = items.map(task => ({
		id: task.id,
		title: task.title,
		date: task.dueDate,
	}))

	return (
		<div style={{ margin: 20 }}>
			<h2>Календарь задач</h2>
			<FullCalendar
				plugins={[dayGridPlugin]}
				initialView='dayGridMonth'
				events={events}
			/>
		</div>
	)
}

export default CalendarView
