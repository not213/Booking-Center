import {Badge, Box, List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';

import ConstructionIcon from '@mui/icons-material/Construction';
import WorkIcon from '@mui/icons-material/Work';

import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router';
import {useSelector} from 'react-redux';

const menus = [
  {
    name: 'อุปกรณ์',
    icon: ConstructionIcon,
    path: '/home',
  },
  {
    name: 'การจอง',
    icon: WorkIcon,
    path: '/booking',
    trackState: true,
  },
  {
    name: 'ประวัติการจอง',
    icon: WorkIcon,
    path: '/my-booking',
  },
];

const menusAdmin = [
  {
    name: 'ประวัติการจอง',
    icon: ConstructionIcon,
    path: '/admin/manage/booking',
  },
  {
    name: 'ห้องอุปกรณ์',
    icon: WorkIcon,
    path: '/admin/manage/room',
    trackState: true,
  },
  {
    name: 'อุปกรณ์',
    icon: WorkIcon,
    path: '/admin/manage/tool',
  },
];

const sidbarMenu = {
  admin: menusAdmin,
  user: menus,
};

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const items = useSelector(state => state.cart.items);

  const [sidebar, setSidebar] = useState(null);

  const isAdmin = () => localStorage.getItem('admin');

  useEffect(() => {
    const admin = isAdmin();
    const menu = admin ? sidbarMenu['admin'] : sidbarMenu['user'];

    setSidebar(menu);
  }, [isAdmin]);

  return (
    <Box className="w-[240px] h-screen" sx={{background: '#fff'}}>
      <Box className=" sticky top-0 ">
        <List>
          {sidebar?.map((menu, i) => (
            <ListItemButton selected={menu.path === location.pathname} key={i} onClick={() => navigate(menu.path)}>
              <ListItemIcon>
                <menu.icon />
                {menu?.trackState && items.length > 0 && <Badge badgeContent={items.length} color="error" />}
              </ListItemIcon>
              <ListItemText primary={menu.name} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
