import httpReq from '../../http/axios';
import {addBooking} from '../slice/bookingSlice';

export const createBooking = async payload => {
  try {
    const res = await httpReq.post(`/booking`, payload);
    // dispatch(getItemsByRoom(res.data.data));
  } catch (error) {}
};
export const getBooking = async () => {
  try {
    const res = await httpReq.get(`/booking`);
    return res.data.data;
  } catch (error) {}
};
export const getBookingAdmin = async dispatch => {
  try {
    const res = await httpReq.get(`/admin/bookings`);
    dispatch(addBooking(res.data.data));
  } catch (error) {}
};
export const updateBookingAdmin = async payload => {
  try {
    const res = await httpReq.put(`/admin/bookings`, payload);
    return res.data.data;
    // dispatch(getItemsByRoom(res.data.data));
  } catch (error) {}
};
