// productsSlice.js (assuming you meant productsSlice, not categorySlice)

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Assuming you have an environment variable for the API URL
const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_URL;

// Define your async thunk action to fetch products
export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async ({ section, subCategory }, { rejectWithValue }) => {
		try {
			// Use a template string to include the section parameter
			const response = await fetch(
				`${apiBaseUrl}/products?section=${section}&&subcategory=${subCategory}`
			);

			if (!response.ok) {
				throw new Error('Failed to fetch products');
			}

			const data = await response.json();
			return data.products;
		} catch (error) {
			// Use rejectWithValue to handle errors and provide a specific error message
			return rejectWithValue('Failed to fetch products');
		}
	}
);

// Create the products slice
const ProductsSlice = createSlice({
	name: 'products',
	initialState: { data: [], status: 'idle', error: null },
	reducers: {
		// Add any reducer actions here if needed
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.data = action.payload;
				state.error = null; // Clear any previous errors on success
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload || 'Failed to fetch products';
			});
	},
});

// Export the actions and reducer
export const {} = ProductsSlice.actions;
export default ProductsSlice.reducer;
