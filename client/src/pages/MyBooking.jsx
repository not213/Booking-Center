import React, {useEffect, useState} from 'react';
import {Box, Divider, Typography} from '@mui/material';
import BookingTable from '../components/booking/BookingTable';
import {getBooking} from '../redux/actions/bookingActions';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {Navigate} from 'react-router';
import useCookie from '../hook/useCookie';
const MyBooking = () => {
  const [bookings, setBookings] = useState(null);

  const [authCookie, helper] = useCookie('jwt');

  useEffect(() => {
    getDate();
  }, []);

  const getDate = async () => {
    const data = await getBooking();
    setBookings(data);
  };

  if (!authCookie) return <Navigate to="/" />;
  return (
    <Box className="flex justify-center flex-col p-8">
      <Box className="mb-8">
        <Typography variant="h5" color="text.secondary">
          ประวัติการจอง ของฉัน
        </Typography>
        <Divider />

        {bookings?.length > 0 ? (
          <Box className="p-7 mx-2 max-w-[800px]">
            <Typography className="mb-5">รายการล่าสุด</Typography>

            <BookingTable data={bookings} />
          </Box>
        ) : (
          <Box className="flex justify-center items-center w-[100%] p-7 mx-2 gap-2">
            <ErrorOutlineIcon className="text-gray-400" />
            <Typography variant="h6" className="text-gray-400">
              ไม่พบประวัติการยืม
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MyBooking;
