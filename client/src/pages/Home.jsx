import React, {useEffect, useState} from 'react';
import {Box, Button, Card, CardActions, CardContent, Chip, Divider, Grid, Typography} from '@mui/material';
import {getItems} from '../http';
import {Navigate, useParams} from 'react-router';
import useCookie from '../hook/useCookie';

import {useDispatch, useSelector} from 'react-redux';
import {addItem} from '../redux/slice';
import {getItemByRoomId} from '../redux/actions/itemActions';
import Item from '../components/Item';

const Home = () => {
  const dispatch = useDispatch();
  const {roomId} = useParams();
  const allItem = useSelector(state => state.item.allItem);

  const [authCookie, helper] = useCookie('jwt');

  useEffect(() => {
    getItemByRoomId(dispatch, roomId);
  }, [dispatch]);

  if (!authCookie) return <Navigate to="/" />;

  return (
    <Box className="flex justify-center flex-col p-8">
      <Box className="mb-8">
        <Typography variant="h5" color="text.secondary">
          จำนวน อุปกรณ์ทั้งหมด {allItem.length} ชิ้น
        </Typography>
        <Divider />
      </Box>
      <Grid container spacing={2} className="px-5 mt-5">
        {allItem?.map((item, i) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={i}>
            <Item {...item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
