import httpReq from '../../http/axios';
import {setRooms, setRoom, removeRoom, editRoom, setRoomById} from '../slice/roomSlice';

export const getRoomList = async dispatch => {
  try {
    const res = await httpReq.get('/rooms');
    dispatch(setRooms(res.data.data));
  } catch (error) {}
};

export const getRoomById = async (dispatch, roomId) => {
  try {
    const res = await httpReq.get(`/rooms/${roomId}`);
    dispatch(setRoomById(res.data.data));
  } catch (error) {}
};
export const createNewRoom = async (dispatch, payload) => {
  try {
    const res = await httpReq.post('/rooms', payload);
    dispatch(setRoom(res.data.data));
  } catch (error) {}
};
export const deleteRoom = async (dispatch, payload) => {
  try {
    await httpReq.post('/rooms/remove', payload);
    dispatch(removeRoom(payload));
  } catch (error) {}
};
export const updateRoom = async (dispatch, payload, id) => {
  try {
    await httpReq.put('/rooms', payload);
    dispatch(editRoom({...payload, id}));
  } catch (error) {}
};
