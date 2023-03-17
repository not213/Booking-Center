import React, {useEffect, useState} from 'react';
import TopBar from './top-bar';
import {Outlet} from 'react-router-dom';

import {makeStyles} from '@mui/styles';
import {Box} from '@mui/material';
import Sidebar from '../components/sidebar';
import Cookies from 'js-cookie';
import {useSelector} from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'whitesmoke',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    height: 'calc(100vh - 64px)',
    mt: 64,
  },
}));

const MainLayout = () => {
  const classes = useStyles();
  const [displaySidebar, setDisplaySidebar] = useState(null);

  const adminToken = useSelector(state => state.admin.token);

  // Whenever user login no matter user or admin
  const getDisplaySidebar = () => {
    return Cookies.get('jwt') || localStorage.getItem('admin');
  };

  useEffect(() => {
    setDisplaySidebar(getDisplaySidebar());
  }, [adminToken]);

  return (
    <div className={classes.root}>
      <TopBar />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            {/* <Sidebar /> */}
            <div className="flex">
              {displaySidebar && (
                <Box>
                  <Sidebar />
                </Box>
              )}
              <Box className="w-[100%] min-h-screen h-screen pb-[5em] mb-5 overflow-auto">
                <Outlet className="bg-main" />
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
