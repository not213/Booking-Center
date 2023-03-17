import {Box, Card, List, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import Room from './room';
import NoMeetingRoomIcon from '@mui/icons-material/NoMeetingRoom';

const RoomList = ({rooms}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (rooms) {
      setLoading(false);
    }
  }, [rooms]);

  return (
    <>
      <Typography>ห้องทั้งหมด</Typography>

      <Card className="px-9 py-8 my-5 ">
        <List className="w-100 max-h-[500px] overflow-y-auto">
          {rooms?.length > 0 ? (
            rooms?.map((room, i) => <Room {...room} key={i} />)
          ) : (
            <Box className="flex flex-col gap-1 justify-center items-center h-100">
              <Typography variant="h6" className="text-gray-400">
                No Room
              </Typography>
              <NoMeetingRoomIcon fontSize="large" className="text-gray-500" />
            </Box>
          )}
        </List>
      </Card>
    </>
  );
};

export default RoomList;
