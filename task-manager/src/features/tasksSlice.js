
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'http://localhost:3001/tasks' 

// Загрузить все задачи
export const loadTasks = createAsyncThunk('tasks/loadTasks', async token => {
	const res = await axios.get(API_URL, {
		headers: { Authorization: `Bearer ${token}` },
	})
	return res.data
})

// Создать задачу
export const addTask = createAsyncThunk(
	'tasks/addTask',
	async ({ task, token }) => {
		const res = await axios.post(API_URL, task, {
			headers: { Authorization: `Bearer ${token}` },
		})
		return res.data
	}
)

// Обновить задачу
export const updateTask = createAsyncThunk(
	'tasks/updateTask',
	async ({ id, task, token }) => {
		const res = await axios.put(`${API_URL}/${id}`, task, {
			headers: { Authorization: `Bearer ${token}` },
		})
		return res.data
	}
)

// Удалить задачу
export const deleteTask = createAsyncThunk(
	'tasks/deleteTask',
	async ({ id, token }) => {
		await axios.delete(`${API_URL}/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		})
		return id 
	}
)

const tasksSlice = createSlice({
	name: 'tasks',
	initialState: {
		items: [],
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(loadTasks.pending, state => {
				state.status = 'loading'
			})
			.addCase(loadTasks.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.items = action.payload
			})
			.addCase(loadTasks.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			.addCase(addTask.fulfilled, (state, action) => {
				state.items.push(action.payload)
			})
			.addCase(updateTask.fulfilled, (state, action) => {
				const idx = state.items.findIndex(t => t.id === action.payload.id)
				if (idx !== -1) state.items[idx] = action.payload
			})
			.addCase(deleteTask.fulfilled, (state, action) => {
				state.items = state.items.filter(t => t.id !== action.payload)
			})
	},
})

export default tasksSlice.reducer
