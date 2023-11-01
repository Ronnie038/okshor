import { createSlice } from '@reduxjs/toolkit';

// Create a cart slice
const loadingSlices = createSlice({
	name: 'isLoading',
	initialState: { isLoading: true },
	reducers: {
		setLoadingState(state, action) {
			state.isLoading = action.payload;
		},
	},
});

export const { setLoadingState } = loadingSlices.actions;

export default loadingSlices.reducer;
