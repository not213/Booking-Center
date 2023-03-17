import {configureStore} from '@reduxjs/toolkit';
import cartReducer from '../slice/cartSlice';
import roomSlice from '../slice/roomSlice';
import itemSlice from '../slice/itemSlice';
import bookingSlice from '../slice/bookingSlice';
import adminLoginSlice from '../slice/adminLoginSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    room: roomSlice,
    item: itemSlice,
    booking: bookingSlice,
    admin: adminLoginSlice,
  },
});

export default store;
