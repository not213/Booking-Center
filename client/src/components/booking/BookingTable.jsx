// import React from 'react';

// const BookingTable = () => {
//   return <div>BookingTable</div>;
// };

// export default BookingTable;

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Button} from '@mui/material';
import {getBookingAdmin, updateBookingAdmin} from '../../redux/actions/bookingActions';
import {useDispatch} from 'react-redux';

function RowItem(props) {
  const {row} = props;
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const getClassStatus = status => {
    if (status === 'pending') return 'bg-yellow-500';
    if (status === 'accepted') return 'bg-green-500';
    if (status === 'rejected') return 'bg-red-500';
    if (status === 'receive') return 'bg-purple-500';
  };

  const handleClickAccepted = async () => {
    const payload = {items: row.ids, status: 'accepted'};

    await updateBookingAdmin(payload);
    getBookingAdmin(dispatch);
  };
  const handleClickReject = async () => {
    const payload = {items: row.ids, status: 'rejected'};

    await updateBookingAdmin(payload);
    getBookingAdmin(dispatch);
  };

  const handleClickBackItem = async () => {
    const payload = {items: row.ids, status: 'receive'};

    await updateBookingAdmin(payload);
    getBookingAdmin(dispatch);
  };

  return (
    <React.Fragment>
      <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell align="center">
          <Box className={`${getClassStatus(row.status)} text-white p-2 rounded-md`}>{row.status}</Box>
        </TableCell>
        <TableCell align="center">
          <Box>{row.room}</Box>
        </TableCell>
        <TableCell align="center">{row?.receive_date ? <Box>{row?.receive_date}</Box> : <Box>-</Box>}</TableCell>
        {props.admin && (
          <TableCell align="center">
            <Box>{row.user}</Box>
          </TableCell>
        )}
        {props.admin && row.status === 'pending' ? (
          <TableCell align="center" className="flex gap-2 justify-center">
            <Button onClick={handleClickAccepted} className="bg-green-500 text-white">
              ยอมรับ
            </Button>
            <Button onClick={handleClickReject} className="bg-red-500 text-white">
              ปฎิเสธ
            </Button>
          </TableCell>
        ) : (
          props.admin &&
          row.status === 'accepted' && (
            <TableCell>
              <Button onClick={handleClickBackItem} className="bg-purple-500 text-white">
                คืนอุปกรณ์
              </Button>
            </TableCell>
          )
        )}
      </TableRow>

      <TableRow>
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className="my-9 mx-3 px-5">
              <Typography variant="h6" gutterBottom component="div">
                รายการ
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>ชื่ออุปกรณ์</TableCell>
                    <TableCell>จำนวน</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.items.map(item => (
                    <TableRow key={item.name}>
                      <TableCell component="th" scope="row">
                        {item.name}
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function BookingTable({data, isAdmin}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>วันที่</TableCell>
            <TableCell align="center">สถานะ</TableCell>
            <TableCell align="center">ห้อง</TableCell>
            <TableCell align="center">วันที่คืน</TableCell>
            {isAdmin && <TableCell align="center">ยืมโดย</TableCell>}
            {isAdmin && <TableCell align="center">Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, i) => (
            <RowItem key={i} row={row} admin={isAdmin} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
