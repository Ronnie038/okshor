import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const fetchUserProfile = createAsyncThunk(
	'user/fetchUserProfile', // Updated action name
	async (_, { dispatch }) => {
		try {
			const response = await fetch(`${apiUrl}/user/profile`, {
				credentials: 'include',
			});
			if (!response.ok) {
				throw new Error('Failed to fetch userProfile');
			}
			const data = await response.json();
			dispatch(fetchUserProfile.fulfilled(data.user));
			return data.user;
		} catch (error) {
			throw error;
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: {}, // Initialize with an empty user object
		isAuthenticated: false,
		status: 'idle', // Initialize status
		error: null, // Initialize error
	},
	reducers: {
		addUser(state, action) {
			state.user = action.payload;
			state.isAuthenticated = true;
		},
		// Your addUser and removeUser reducers can remain the same if they are working for your use case.
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserProfile.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchUserProfile.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload;
				state.isAuthenticated = true;
			})
			.addCase(fetchUserProfile.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
