
import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from '../features/tasksSlice'
import authReducer from '../features/authSlice'
// Импортируем редьюсеры
export const store = configureStore({
	reducer: {
		tasks: tasksReducer,
		auth: authReducer,
	},
})
