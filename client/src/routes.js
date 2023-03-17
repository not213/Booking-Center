import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import ItemList from './pages/ItemList';
import MyListItem from './pages/MyListItem';
import Login from './pages/Login';
import MainLayout from './layout/main-layout';
import AdminLogin from './pages/AdminLogin';
import AdminManageRoom from './pages/AdminManageRoom';
import AdminManageTool from './pages/AdminManageTool';
import Main from './pages/Main';
import MyBooking from './pages/MyBooking';
import AdminManageBooking from './pages/AdminManageBooking';
import AdminManageRoomViewItems from './pages/AdminManageRoomViewItems';
const {createBrowserRouter} = require('react-router-dom');

/* eslint-disable import/first */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Login />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/admin/login',
        element: <AdminLogin />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/admin/manage/room',
        element: <AdminManageRoom />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/admin/manage/room/:roomId',
        element: <AdminManageRoomViewItems />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/admin/manage/item/:itemId',
        element: <AdminManageRoomViewItems />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/admin/manage/tool',
        element: <AdminManageTool />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/admin/manage/booking',
        element: <AdminManageBooking />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/home',
        element: <Main />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/items/:roomId',
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/booking',
        element: <MyListItem />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/my-booking',
        element: <MyBooking />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/list-item',
        element: <ItemList />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
