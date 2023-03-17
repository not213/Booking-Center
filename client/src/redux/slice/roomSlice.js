import {createSlice} from '@reduxjs/toolkit';

const roomSlice = createSlice({
  name: 'room',
  initialState: {
    allRoom: [],
    room: null,
  },
  reducers: {
    setRooms: (state, action) => {
      state.allRoom = action.payload;
    },
    setRoom: (state, action) => {
      state.allRoom.push(action.payload);
    },
    setRoomById: (state, action) => {
      state.room = action.payload;
    },
    removeRoom: (state, action) => {
      state.allRoom = state.allRoom.filter(room => room._id !== action.payload.id);
    },
    editRoom: (state, action) => {
      state.allRoom = state.allRoom.map(room => {
        if (room._id === action.payload.id) {
          return {...room, ...action.payload};
        }
        return room;
      });
    },
  },
});

export const {setRooms, setRoom, setRoomById, removeRoom, editRoom} = roomSlice.actions;

export default roomSlice.reducer;
