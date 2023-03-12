import { createSlice } from "@reduxjs/toolkit";

export const ReducerProducts = createSlice({
  name: 'products',
  initialState: {
    data: [],
  },
  reducers: {
    submitData: (state, action) => {
      let sample = [...state.data];
      sample.push(action.payload);
      state.data = sample;
    },
    deleteData: (state, {payload}) => {
      let sample = [...state.data].filter(i => i?.item !== payload);
      state.data = sample;
    }
  }
});

export const { submitData, deleteData } = ReducerProducts.actions;

export default ReducerProducts.reducer;