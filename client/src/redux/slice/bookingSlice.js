import {createSlice} from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    allBooking: [],
  },
  reducers: {
    addBooking: (state, action) => {
      state.allBooking = action.payload;
    },
  },
});

export const {addBooking} = bookingSlice.actions;

export default bookingSlice.reducer;
