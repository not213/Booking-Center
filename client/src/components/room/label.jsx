import styled from '@emotion/styled';
import {Box, TextField, Typography} from '@mui/material';
import React, {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {updateRoom} from '../../redux/actions/roomActions';
const Label = styled(Box)(({theme}) => {});

const LabelText = ({fieldName, value, Icon, id, label}) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [field, setField] = React.useState(value);
  const inputRef = React.createRef();

  const dispatch = useDispatch();

  const handleSetEdit = () => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    setIsEdit(false);
    setField(value);

    if (field !== '') {
      updateRoom(dispatch, {[label]: field, id}, id);
    }
  };

  useEffect(() => {
    if (isEdit) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  return (
    <>
      <Label className=" flex gap-2 min-w-[100px] text-main">
        <Icon />
        <Typography className="font-bold">{fieldName}</Typography>
      </Label>
      {isEdit ? (
        <TextField
          value={field}
          onChange={e => setField(e.target.value)}
          inputRef={inputRef}
          type="text"
          onBlur={handleCancel}
        />
      ) : (
        <Typography className="text-gray-500 font-thin" onDoubleClick={handleSetEdit}>
          {value}
        </Typography>
      )}
    </>
  );
};

export default LabelText;
