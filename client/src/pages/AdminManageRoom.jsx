import {Box, Button, Card, CardActions, Divider, Grid, TextField, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {createRoom} from '../http';
import RoomList from '../components/room/room-list';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {createNewRoom, getRoomList} from '../redux/actions/roomActions';
import {Navigate} from 'react-router';

const AdminManageRoom = () => {
  const dispatch = useDispatch();
  const rooms = useSelector(state => state.room.allRoom);

  useEffect(() => {
    getRoomList(dispatch);
  }, [dispatch]);

  const schema = yup.object().shape({
    name: yup.string().required('ชื่อห้อง จำเป็น'),
    refcode: yup.string().required('รหัสห้อง จำเป็น'),
  });

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async data => {
    try {
      // await createRoom(data);
      await createNewRoom(dispatch, data);
      reset();
    } catch (error) {}
  };

  const getTextError = error => (error ? error.message : '');
  const isError = field => (Boolean(field) ? true : false);

  const isLogin = () => localStorage.getItem('admin');
  if (!isLogin()) return <Navigate to="/admin/login" />;

  return (
    <Box className="p-5">
      <Typography variant="h5">จัดการห้องอุปกรณ์</Typography>
      <Divider />

      <Box className="p-5">
        <Grid container spacing={2}>
          <Grid item sm={12} md={6} lg={5}>
            <Typography>เพิ่มห้อง</Typography>
            <form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
              <Card className="px-9 py-8 my-5">
                <Box className="flex">
                  <Typography className="min-w-[100px]">ชื่อห้อง:</Typography>
                  <TextField
                    fullWidth
                    {...register('name')}
                    type="text"
                    name="name"
                    error={isError(errors.name)}
                    helperText={getTextError(errors.name)}
                  />
                </Box>
                <Box className="flex mt-5">
                  <Typography className="min-w-[100px]">รหัส:</Typography>
                  <TextField
                    fullWidth
                    {...register('refcode')}
                    type="text"
                    name="refcode"
                    error={isError(errors.refcode)}
                    helperText={getTextError(errors.refcode)}
                  />
                </Box>
                <CardActions className="mt-5 flex justify-end">
                  <Button className="bg-main text-white" type="submit">
                    เพิ่ม!
                  </Button>
                </CardActions>
              </Card>
            </form>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={7}>
            <RoomList rooms={rooms} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminManageRoom;
