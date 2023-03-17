import {
  Box,
  Button,
  Card,
  CardActions,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import {Dropzone, FileItem, FullScreenPreview} from '@dropzone-ui/react';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getRoomList} from '../redux/actions/roomActions';

import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';

import httpReq from '../http/axios';
import {Navigate, useLocation} from 'react-router';
import {toast} from 'react-toastify';

const schema = yup.object().shape({
  name: yup.string().required('ชื่อ จำเป็น'),
  stock: yup.number().min(1, 'จำนวน 1 ขึ้น').required('จำนวน จำเป็น'),
  refRoom: yup.string().required('ห้อง จำเป็น'),
});

const AdminManageTool = () => {
  const [selectedRoom, setSelectedRoom] = useState('');
  const [titleImageFile, setTitleImageFile] = useState(undefined);
  const [titleImageImageSrc, setTitleImageImageSrc] = useState(undefined);

  // rooms
  const allRoomList = useSelector(state => state.room.allRoom);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    getRoomList(dispatch);
  }, [dispatch]);

  const handleChange = e => setSelectedRoom(e.target.value);

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async data => {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    formData.append('image', titleImageFile[0].file);

    try {
      await httpReq.post('/admin/items', formData);
      resetAll();
      toast.success('เพิ่มอุปกรณ์สำเร็จ');
    } catch (error) {
      console.log(error);
    }
  };

  const resetAll = () => {
    reset();
    setSelectedRoom('');
    setTitleImageFile(undefined);
    setTitleImageImageSrc(undefined);
  };

  const getTextError = error => (error ? error.message : '');
  const isError = field => (Boolean(field) ? true : false);

  const isLogin = () => localStorage.getItem('admin');
  if (!isLogin()) return <Navigate to="/admin/login" state={{from: location.pathname}} />;

  return (
    <Box className="p-5">
      <Typography variant="h5">จัดการอุปกรณ์</Typography>
      <Divider />

      <Box className="p-5">
        <form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
          <Card>
            <CardActions className="bg-main">
              <Typography sx={{color: 'white'}}>เพิ่มอุปกรณ์</Typography>
            </CardActions>
            <Box className="px-9 py-8 my-5">
              <Grid container spacing={2}>
                <Grid item sm={12} md={6} lg={6}>
                  <Box className="flex">
                    <Typography className="min-w-[100px]">ชื่อ:</Typography>
                    <TextField
                      fullWidth
                      type="text"
                      {...register('name')}
                      error={isError(errors.name)}
                      helperText={getTextError(errors.name)}
                    />
                  </Box>
                  <Box className="flex mt-5">
                    <Typography className="min-w-[100px]">จำนวน:</Typography>
                    <TextField
                      fullWidth
                      type="number"
                      defaultValue={1}
                      {...register('stock')}
                      error={isError(errors.stock)}
                      helperText={getTextError(errors.stock)}
                    />
                  </Box>
                  <Box className="flex mt-5">
                    <Typography className="min-w-[100px]">ห้อง:</Typography>
                    <FormControl fullWidth error={isError(errors.refRoom)}>
                      <Select
                        value={selectedRoom}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        {...register('refRoom')}
                        onChange={handleChange}>
                        <MenuItem value="" disabled>
                          กรุณาเลือกห้องอุปกรณ์
                        </MenuItem>
                        {allRoomList?.map((room, i) => (
                          <MenuItem key={i} value={room._id}>
                            {room.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.refRoom && <FormHelperText>{getTextError(errors.refRoom)}</FormHelperText>}
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item sm={12} md={6} lg={6}>
                  <Dropzone
                    onChange={incommingFiles => {
                      setTitleImageFile(incommingFiles);
                      // onChange(incommingFiles);
                    }}
                    header={false}
                    // minHeight="195px"
                    value={titleImageFile}
                    maxFiles={1}
                    maxFileSize={2998000}
                    accept=".png, .jpg, image/*"
                    disableScroll
                    localization={'EN-en'}>
                    {titleImageFile?.map(file => (
                      <FileItem
                        {...file}
                        key={file.id}
                        onDelete={id => {
                          let tmpFiles = titleImageFile.filter(x => x.id !== id);
                          setTitleImageFile(tmpFiles);
                        }}
                        onSee={imageSource => setTitleImageImageSrc(imageSource)}
                        // onDrop={handleDrop}
                        resultOnTooltip
                        preview
                        info
                        hd
                      />
                    ))}
                    <FullScreenPreview
                      imgSource={titleImageImageSrc}
                      openImage={titleImageImageSrc}
                      onClose={() => setTitleImageImageSrc(undefined)}
                    />
                  </Dropzone>
                </Grid>
              </Grid>
            </Box>
            <CardActions className="mt-5 flex justify-end">
              <Button className="bg-main text-white px-2 m-2" type="submit">
                เพิ่ม!
              </Button>
            </CardActions>
          </Card>
        </form>
      </Box>
    </Box>
  );
};

export default AdminManageTool;
