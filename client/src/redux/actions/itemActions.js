import httpReq from '../../http/axios';
import {getItemsByRoom} from '../slice/itemSlice';

export const getItemByRoomId = async (dispatch, roomId) => {
  try {
    const res = await httpReq.get(`/items/rooms/${roomId}`);
    dispatch(getItemsByRoom(res.data.data));
  } catch (error) {}
};
