// productsSlice.js (assuming you meant productsSlice, not categorySlice)

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Assuming you have an environment variable for the API URL
const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_URL;

// Define your async thunk action to fetch products
export const fetchBcsNewses = createAsyncThunk(
	'bcsNews/fetchBcsNewses',
	async (category, { rejectWithValue }) => {
		try {
			// Use a template string to include the section parameter
			const response = await fetch(
				`${apiBaseUrl}/bcsNews?category=${category}`
			);

			if (!response.ok) {
				throw new Error('Failed to fetch products');
			}

			const data = await response.json();
			return data.data;
		} catch (error) {
			// Use rejectWithValue to handle errors and provide a specific error message
			return rejectWithValue('Failed to fetch products');
		}
	}
);

// Create the products slice
const BcsNewsSlice = createSlice({
	name: 'bcsNews',
	initialState: {
		data: [],
		subcategory: [],
		filteredData: [],
		status: 'idle',
		error: null,
	},
	reducers: {
		getFilteredBcsNewses(state, action) {
			const data = state.data;
			state.filteredData = data.filter(
				(item) => item.subcategory === action.payload
			);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBcsNewses.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchBcsNewses.fulfilled, (state, action) => {
				state.status = 'succeeded';
				const propertyValues = action.payload.map((obj) => obj['subcategory']);
				const uniqueValuesSet = new Set(propertyValues);

				const uniqueSubcategory = Array.from(uniqueValuesSet);
				state.filteredData = action.payload.filter(
					(item) => item.subcategory === uniqueSubcategory[0]
				);
				state.subcategory = uniqueSubcategory;
				state.data = action.payload;
				state.error = null; // Clear any previous errors on success
			})
			.addCase(fetchBcsNewses.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload || 'Failed to fetch products';
			});
	},
});

// Export the actions and reducer
export const { getFilteredBcsNewses } = BcsNewsSlice.actions;
export default BcsNewsSlice.reducer;
