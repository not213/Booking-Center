import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  IconButton,
  ListItem,
  Modal,
  Typography,
} from '@mui/material';
import React from 'react';
import SegmentIcon from '@mui/icons-material/Segment';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import NumbersIcon from '@mui/icons-material/Numbers';
import styled from '@emotion/styled';
import {useDispatch} from 'react-redux';
import {deleteRoom} from '../../redux/actions/roomActions';
import LabelText from './label';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {useNavigate} from 'react-router';

const Main = styled(Box)(({theme}) => {});
const Container = styled(Grid)(({theme}) => {});
const WraperLabel = styled(Grid)(({theme}) => {});
const Label = styled(Box)(({theme}) => {});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
const Room = props => {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const handleDelete = id => {
    deleteRoom(dispatch, {id});
    setOpen(false);
  };

  const handleViewRoomItem = roomId => {
    navigate(`/admin/manage/room/${roomId}`);
  };

  return (
    <>
      <ListItem className="w-100 cursor-pointer">
        <Main className="flex justify-between items-center w-[100%] px-2">
          <Container className="py-2" container spacing={2}>
            <WraperLabel className="flex" item xs={12} sm={12} md={12} lg={6}>
              <LabelText fieldName="ชื่อ" value={props.name} Icon={SegmentIcon} id={props._id} label="name" />
            </WraperLabel>
            <WraperLabel className="flex" item xs={12} sm={12} md={12} lg={6}>
              <LabelText fieldName="รหัส" value={props.refcode} Icon={NumbersIcon} id={props._id} label="refcode" />
            </WraperLabel>
          </Container>
          <IconButton onClick={() => handleViewRoomItem(props._id)}>
            <VisibilityIcon />
          </IconButton>

          <IconButton onClick={handleOpen}>
            <DeleteOutlineIcon className="text-red-500" />
          </IconButton>
        </Main>
      </ListItem>
      <Divider className="w-5/6 mb-2" />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Card sx={style}>
          <CardActions>
            <Typography variant="h6">ยืนยันลบห้องนี้</Typography>
          </CardActions>
          <CardContent>
            <Box className="flex gap-2">
              <Button className="bg-red-500 text-white" onClick={() => handleDelete(props._id)}>
                ยืนยัน
              </Button>
              <Button className="bg-gray-600 text-white" onClick={handleClose}>
                ยกเลิก
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default Room;
