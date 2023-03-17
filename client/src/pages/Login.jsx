import {Box, Button, Card, CardActions, CardContent, Typography} from '@mui/material';
import React, {useState} from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import useCookie from '../hook/useCookie';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookie, helper] = useCookie('jwt');

  // Redirect to previous path or homepage
  const {from} = location.state || {from: {pathname: '/home'}};

  if (helper.getCookie()) {
    return <Navigate to={from} />;
  }

  return (
    <Box className="w-screen flex justify-center items-center h-[100%]">
      <Card className="md:w-[600px] xs:w-[400px] sm:w-[600px] sm:h-[600px] h-[600px] flex flex-col justify-evenly rounded-[20px] ">
        <CardActions className="flex justify-center flex-col gap-3 my-5 ">
          <Typography variant="h4" color="text.main">
            เข้าสู่ระบบ
          </Typography>
          <Typography variant="body1" color="text.secondary">
            กรุณาใช้บัญชี google Gmail ในการใช้บริการ
          </Typography>
        </CardActions>
        <CardContent>
          <Box className="flex justify-center items-center h-[100%]">
            <a href="/auth/google">
              <Button className="bg-red-500 text-white border-white" variant="outlined" startIcon={<GoogleIcon />}>
                Sign In
              </Button>
            </a>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
