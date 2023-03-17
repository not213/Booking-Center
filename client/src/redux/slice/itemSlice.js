import {createSlice} from '@reduxjs/toolkit';

const itemSlice = createSlice({
  name: 'item',
  initialState: {
    allItem: [],
  },
  reducers: {
    getItemsByRoom: (state, action) => {
      state.allItem = action.payload;
    },
  },
});

export const {getItemsByRoom} = itemSlice.actions;

export default itemSlice.reducer;
