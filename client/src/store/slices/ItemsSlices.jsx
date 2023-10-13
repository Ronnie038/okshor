import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: {},
  reducers: {
    addItems(state, action) {
      state.data = action.payload;
    },
  },
});

export const { addItems } = itemsSlice.actions;
export default itemsSlice.reducer;
