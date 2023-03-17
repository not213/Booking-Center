import {createSlice} from '@reduxjs/toolkit';

const adminSLice = createSlice({
  name: 'admin',
  initialState: {
    token: localStorage.getItem('admin'),
  },
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem('admin', action.payload.token);
    },
    getToken: (state, action) => {
      state.token = localStorage.setItem('admin', action.payload.token);
    },
    clearToken: (state, action) => {
      localStorage.removeItem('admin');
      state.token = null;
    },
  },
});

export const {addToken, clearToken} = adminSLice.actions;

export default adminSLice.reducer;
