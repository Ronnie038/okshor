// // categorySlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_URL;

// export const fetchCategories = createAsyncThunk(
// 	'categories/fetchCategories',
// 	async () => {
// 		try {
// 			const response = await fetch(`${apiBaseUrl}/category`);
// 			if (!response.ok) {
// 				throw new Error('Failed to fetch categories');
// 			}
// 			const data = await response.json();
// 			return data;
// 		} catch (error) {
// 			throw error;
// 		}
// 	}
// );

// const categorySlice = createSlice({
// 	name: 'categories',
// 	initialState: { data: [], status: 'idle', error: null },
// 	reducers: {
// 		addCategories(state, action) {
// 			// You can update the state here if needed
// 		},
// 	},
// 	extraReducers: (builder) => {
// 		builder
// 			.addCase(fetchCategories.pending, (state) => {
// 				state.status = 'loading';
// 			})
// 			.addCase(fetchCategories.fulfilled, (state, action) => {
// 				state.status = 'succeeded';
// 				state.data = action.payload.data;
// 			})
// 			.addCase(fetchCategories.rejected, (state, action) => {
// 				state.status = 'failed';
// 				state.error = action.error.message;
// 			});
// 	},
// });

// export const { addCategories } = categorySlice.actions;
// export const selectCategories = (state) => state.categories.data;
// export default categorySlice.reducer;
