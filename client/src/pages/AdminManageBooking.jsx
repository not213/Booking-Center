import {Box, Divider, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router';
import BookingTable from '../components/booking/BookingTable';
import {getBookingAdmin} from '../redux/actions/bookingActions';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const AdminManageBooking = () => {
  const dispatch = useDispatch();
  const {allBooking} = useSelector(state => state.booking);

  const isLogin = () => localStorage.getItem('admin');

  useEffect(() => {
    getBookingAdmin(dispatch);
  }, [dispatch]);

  if (!isLogin()) return <Navigate to="/admin/login" />;

  console.log(allBooking);

  return (
    <Box className="p-5">
      <Typography variant="h5">ประวัติการขอยืม</Typography>
      <Divider />
      {allBooking.length > 0 ? (
        <Box className="p-7 mx-2 max-w-[800px]">
          <Typography className="mb-5">รายการทั้งหมด</Typography>
          <BookingTable data={allBooking} isAdmin={true} />
        </Box>
      ) : (
        <Box className="flex justify-center items-center mt-5 gap-2">
          <ErrorOutlineIcon className="text-gray-500" />
          <Typography variant="h6" className="text-gray-500">
            ไม่พบข้อมูล
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AdminManageBooking;
