import {Button, Divider, Grid, Typography} from '@mui/material';
import {Box} from '@mui/system';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router';
import Item from '../components/Item';
import {getItemByRoomId} from '../redux/actions/itemActions';
import {getRoomById} from '../redux/actions/roomActions';

const AdminManageRoomViewItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {roomId} = useParams();

  const allItem = useSelector(state => state.item.allItem);
  const room = useSelector(state => state.room.room);

  useEffect(() => {
    getItemByRoomId(dispatch, roomId);
    getRoomById(dispatch, roomId);
  }, [dispatch]);
  return (
    <Box className="p-5">
      <Box className="flex py-2">
        <Button className="mr-6 text-main :hover:bg-gray-200" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Typography variant="h5" className="text-gray-500">
          ห้องอุปกรณ์: &nbsp; {room?.name}
        </Typography>
      </Box>
      <Divider />
      <Grid container spacing={2} className="px-5 mt-5">
        {allItem?.map((item, i) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={i}>
            <Item {...item} viewOnly />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminManageRoomViewItems;
