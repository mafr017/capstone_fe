import { createSlice } from "@reduxjs/toolkit";

export const reducerAbout = createSlice({
  name: 'products',
  initialState: {
    userData: {
      name: '',
      email: ''
    }
  },
  reducers: {
    setUserData: ({ userData }, { payload }) => {
        userData.name = payload.name;
        userData.email = payload.email;
    }
  }
});

export const {setUserData} = reducerAbout.actions;

export default reducerAbout.reducer;