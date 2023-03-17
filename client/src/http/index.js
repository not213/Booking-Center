import httpReq from './axios';

export const reqLogin = () => httpReq.get('/auth/google');
export const reqLogout = () => httpReq.get('/logout');

// Profile

export const reqGetProfile = id => httpReq.post('/user', {id});

// Items
export const getItems = () => httpReq.get('/items');

// Rooms

export const getRooms = () => httpReq.get('/rooms');
export const createRoom = body => httpReq.post('/rooms', body);

export const adminLogin = body => httpReq.post('/admin/login', body);
