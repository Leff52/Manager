
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'http://localhost:3001'

export const registerUser = createAsyncThunk(
	'auth/registerUser',
	async data => {
		const res = await axios.post(`${API_URL}/register`, data)
		return res.data 
	}
)

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async credentials => {
		const res = await axios.post(`${API_URL}/login`, credentials)
		return res.data 
	}
)
// Срез для аутентификации
const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: null,
		user: null,
		status: 'idle',
		error: null,
	},
	reducers: {
		logout(state) {
			state.token = null
			state.user = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(registerUser.fulfilled, (state, action) => {
				state.token = action.payload.token
				state.user = action.payload.user
				state.status = 'succeeded'
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.error = action.error.message
				state.status = 'failed'
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.token = action.payload.token
				state.user = action.payload.user
				state.status = 'succeeded'
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.error = action.error.message
				state.status = 'failed'
			})
	},
})

export const { logout } = authSlice.actions
export default authSlice.reducer
