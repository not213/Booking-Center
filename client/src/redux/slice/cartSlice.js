import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i._id === item._id);

      if (existingItem) {
        existingItem.quantity += 1;

        const limitTotal = existingItem.total + item.total > item.stock;

        if (!limitTotal) {
          existingItem.total = existingItem.total + item.total;
        }
      } else {
        state.items.push(item);
      }

      // state.totalPrice += item.price;
    },
    removeItem: (state, action) => {
      const id = action.payload;

      state.items = state.items.filter(item => item._id !== id);
    },
    clearCart: state => {
      state.items = [];
      // state.totalPrice = 0;
    },
    increaseQuantity(state, action) {
      const itemId = action.payload;
      const item = state.items.find(item => item._id === itemId);
      if (item && item.total < item.stock) {
        item.total++;
      }
    },
    decreaseQuantity(state, action) {
      const itemId = action.payload;
      const item = state.items.find(item => item._id === itemId);
      if (item && item.total > 1) {
        item.total--;
      }
    },
  },
});

export const {addItem, removeItem, clearCart, increaseQuantity, decreaseQuantity} = cartSlice.actions;

export default cartSlice.reducer;
