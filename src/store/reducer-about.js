import { createSlice } from "@reduxjs/toolkit";

export const reducerAbout = createSlice({
  name: 'products',
  initialState: {
    aboutContent:'Selamat datang di about page'
  },
  reducers: {
   
  }
});

export const {} = reducerAbout.actions;

export default reducerAbout.reducer;