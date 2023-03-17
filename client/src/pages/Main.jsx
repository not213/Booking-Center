import {Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate, useNavigate} from 'react-router';
import {getRoomList} from '../redux/actions/roomActions';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import useCookie from '../hook/useCookie';

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // rooms
  const allRoomList = useSelector(state => state.room.allRoom);
  const [authCookie, helper] = useCookie('jwt');

  useEffect(() => {
    getRoomList(dispatch);
  }, [dispatch]);

  const handleToRoom = roomId => navigate(`/items/${roomId}`);

  if (!authCookie) return <Navigate to="/" />;

  return (
    <Box className="p-8">
      <Box className="mb-8">
        <Typography variant="h5" color="text.secondary">
          ห้องอุปกรณ์ทั้งหมด
        </Typography>
        <Divider />
      </Box>
      <Grid container spacing={2} className="px-5 my-5">
        {allRoomList?.length > 0 ? (
          allRoomList?.map(room => (
            <Grid item xs={12} sm={12} md={6} lg={4} key={room._id}>
              <Card className="px-5 pt-2 pb-4">
                <CardActions className="flex justify-between items-center w-100">
                  <Typography variant="h6" className="text-main font-medium">
                    ห้อง {room.name}
                  </Typography>
                  <Typography variant="body1" className="text-gray-500">
                    รหัส {room.refcode}
                  </Typography>
                </CardActions>
                <Divider />
                <CardContent>
                  <Box className="flex justify-center mt-5">
                    <Button className="bg-main text-white" fullWidth onClick={() => handleToRoom(room._id)}>
                      ดูอุปกรณ์!
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Box className="flex justify-center items-center w-[100%] gap-2">
            <ErrorOutlineIcon className="text-gray-500" />
            <Typography variant="h6" className="text-gray-500">
              ไม่มีห้อง
            </Typography>
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default Main;
