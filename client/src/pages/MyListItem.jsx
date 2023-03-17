import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  Icon,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useCookie from '../hook/useCookie';
import {Navigate} from 'react-router';
import {clearCart, decreaseQuantity, increaseQuantity, removeItem} from '../redux/slice/cartSlice';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InfoIcon from '@mui/icons-material/Info';
import {createBooking} from '../redux/actions/bookingActions';

const MyListItem = () => {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const [authCookie, helper] = useCookie('jwt');

  const increment = itemId => dispatch(increaseQuantity(itemId));
  const decrement = itemId => dispatch(decreaseQuantity(itemId));
  const remove = itemId => dispatch(removeItem(itemId));

  const getImageURL = imgUrl => process.env.REACT_APP_IMAGE_URL + imgUrl;

  const handleBooking = async () => {
    await createBooking({items});
    dispatch(clearCart());
  };
  if (!authCookie) return <Navigate to="/" />;

  return (
    <Box className="flex justify-center flex-col p-8">
      <Box className="mb-8">
        <Typography variant="h5" color="text.secondary">
          รายการยืม
        </Typography>
        <Divider />
      </Box>

      {items.length > 0 ? (
        <>
          <Box className="flex justify-center">
            <Button onClick={handleBooking} className="bg-main text-white w-1/6 mx-5 ">
              ยืนยันการยืม!
            </Button>
          </Box>
          <Grid container spacing={2} className="px-5 mt-5">
            {items?.map((item, i) => (
              <Grid item xs={12} sm={12} md={6} lg={4} key={i}>
                <Card>
                  <CardActions className="flex items-center justify-evenly px-5 pt-6">
                    <Typography color="text.secondary" variant="body1">
                      {item.name}
                    </Typography>
                  </CardActions>
                  <CardContent className="px-6">
                    <Box className="flex flex-wrap justify-evenly">
                      <img
                        src={getImageURL(item.image)}
                        alt={item.name}
                        className="w-[150px] h-[150px] object-cover rounded"
                      />
                      <Box>
                        <Typography color="text.secondary">จำนวน</Typography>
                        <Typography variant="h6" color="text.main">
                          {item.total}
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="flex justify-center flex-wrap gap-2 items-center mt-4">
                      <Box className="flex justify-center gap-2">
                        <Tooltip title="เพิ่ม">
                          <IconButton
                            className="bg-blue-500 text-white text-xs"
                            size="small"
                            onClick={() => increment(item._id)}>
                            <AddIcon />
                          </IconButton>
                        </Tooltip>

                        <IconButton
                          className="bg-red-500 text-white text-xs"
                          size="small"
                          onClick={() => decrement(item._id)}>
                          <RemoveIcon />
                        </IconButton>
                      </Box>
                      <Box className="mx-5">
                        <Chip
                          onClick={() => remove(item._id)}
                          className="cursor-pointer hover:bg-red-800 hover:text-white hover:border-red-800 transition-all ease-in-out delay-250"
                          label="นำออก"
                          deleteIcon={<DeleteForeverIcon />}
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <>
          <Box className="flex justify-center items-center gap-2">
            <Typography variant="h6" className="text-gray-400">
              ไม่มีการจอง
            </Typography>
            <InfoIcon className="text-gray-400" />
          </Box>
        </>
      )}
    </Box>
  );
};

export default MyListItem;
