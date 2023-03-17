import React, {useState} from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from '@emotion/styled';
import {useDispatch} from 'react-redux';
import {addItem} from '../../redux/slice/cartSlice';
import {useParams} from 'react-router';

const ItemTotalInput = styled(TextField)({
  '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
});

const Item = props => {
  const dispatch = useDispatch();
  const {roomId} = useParams();
  const getImageURL = imgUrl => process.env.REACT_APP_IMAGE_URL + imgUrl;

  const [selected, setSelected] = useState(1);

  const handleAdd = () => {
    setSelected(prev => (prev < props.stock ? prev + 1 : prev));
  };
  const handleRemove = () => {
    setSelected(prev => (prev > 1 ? prev - 1 : prev));
  };

  const handelChange = e => {
    const {value: newValue} = e.target;
    const isValidInput = newValue <= props.stock && newValue >= 1;
    setSelected(prev => (isValidInput ? Number(newValue) : prev));
  };

  const handleAddItem = () => {
    dispatch(addItem({...props, total: selected, roomId}));
  };

  return (
    <Card>
      <CardActions className="flex items-center justify-evenly px-5 pt-6">
        <Typography color="text.secondary" variant="body1">
          {props.name}
        </Typography>
        {!props.viewOnly && (
          <Box className="flex ">
            {props.stock > 0 ? (
              <Typography className="bg-main text-white px-3 py-1 rounded-md text-xs">มีของ</Typography>
            ) : (
              <Typography className="bg-red-500 text-white px-3 py-1 rounded-md text-xs">ของหมด</Typography>
            )}
          </Box>
        )}
      </CardActions>
      <CardContent className="px-6">
        <Box className="flex flex-wrap justify-evenly">
          <img src={getImageURL(props.image)} alt={props.name} className="w-[150px] h-[150px] object-cover rounded" />
          <Box>
            <Typography color="text.secondary">จำนวนเหลือ</Typography>
            <Typography variant="h6" color="text.main">
              {props.stock}
            </Typography>
          </Box>
        </Box>
        {!props.viewOnly && (
          <Box className="flex justify-center items-center gap-2 flex-wrap mt-4">
            <Box className="flex justify-center items-center gap-2 bg-gray-100 py-2 px-3 rounded-md">
              <Tooltip title="เพิ่ม">
                <IconButton className="bg-blue-500 text-white text-xs" size="small" onClick={handleAdd}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Box className="mx-2">
                <ItemTotalInput
                  type="number"
                  value={selected}
                  sx={{width: 50, appearance: 'none'}}
                  onChange={handelChange}
                />
                {/* <Typography>{selected}</Typography> */}
              </Box>

              <Tooltip title="นำออก">
                <IconButton className="bg-red-500 text-white text-xs" size="small" onClick={handleRemove}>
                  <RemoveIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box className="cursor-pointer  mx-4">
              <Button
                disabled={Boolean(!props.stock)}
                onClick={handleAddItem}
                className={`text-main bg-gray-200 px-2 py-1 rounded-md hover:rounded-lg hover:bg-gray-600 hover:text-white ${
                  Boolean(!props.stock) && 'text-gray-300'
                }`}>
                เพิ่มรายการ
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default Item;
