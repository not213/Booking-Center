import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {AppBar, Box, Divider, ListItemIcon, Menu, MenuItem, Toolbar, Typography} from '@mui/material';
// import {makeStyles} from '@mui/styles';
import styled from '@emotion/styled';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import {Link as RouterLink, useNavigate} from 'react-router-dom';
import Logo from '../components/logo';
import useCookie from '../hook/useCookie';
import useProfile from '../hook/useProfile';
import {reqLogout} from '../http';

const useStyles = styled({
  root: {},
  toolbar: {
    height: 64,
  },
});

const TopBar = ({className, ...rest}) => {
  const classes = useStyles();

  const [_, helper] = useCookie('jwt');

  const userId = helper.getId();
  const user = useProfile(userId) || localStorage.getItem('admin');

  // Account menu
  const [anchorAccountMenu, setAnchorAccountMenu] = useState(null);
  const openAccountMenu = Boolean(anchorAccountMenu);

  const handleCloseProfile = () => {
    setAnchorAccountMenu(null);
  };

  const handleClickLogout = () => {
    if (localStorage.getItem('admin')) {
      localStorage.removeItem('admin');
      window.location.reload();
    } else {
      reqLogout();
      helper.clearCookie();
      window.location.reload();
    }
  };

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar className={classes.toolbar}>
        <Box className="flex justify-between w-[100%]">
          <RouterLink to="/" className="flex space-x-2 items-center ">
            <Box className=" px-6 ">
              {/* <Logo /> */}
              <Typography color="text.white" className="font-bold">
                Booking Center
              </Typography>
            </Box>
          </RouterLink>
          <Box>
            {user && (
              <Box pb={2} className="flex items-center justify-center">
                <img src="/assets/images/user.webp" className="w-[40px] h-[40px] rounded-full mr-6" />

                <ExitToAppIcon fontSize="small" color="error" className="cursor-pointer" onClick={handleClickLogout} />
              </Box>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};

export default TopBar;
