import React from 'react';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {Box, Button, Card, CardContent, TextField, Typography} from '@mui/material';
import {adminLogin} from '../http';
import {useLocation, useNavigate} from 'react-router';
import {Navigate} from 'react-router';
import {useLocalStorage} from 'react-use';
import {useDispatch} from 'react-redux';
import {addToken} from '../redux/slice/adminLoginSlice';

const schema = yup.object().shape({
  email: yup.string().email().required('Email จำเป็น'),
  password: yup
    .string()
    .min(8, 'ความยาวอย่างน้อย 8 อักขระ')
    .max(32, 'ความยาวอย่างน้อย 32 อักขระ')
    .required('Password จำเป็น'),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async data => {
    const res = await adminLogin(data);
    // setAdmin(res.data.token);
    // addToken(dispatch({token: res.data.token}));
    dispatch(addToken({token: res.data.token}));
    // setLocalJWT(res.data.token);
    reset();
  };

  const setLocalJWT = token => {
    localStorage.setItem('admin', token);
    navigate('/admin/manage/booking');
  };

  const getTextError = error => (error ? error.message : '');
  const isError = field => (Boolean(field) ? true : false);

  const isLogin = () => localStorage.getItem('admin');
  if (isLogin()) return <Navigate to="/admin/manage/booking" />;

  return (
    <Box className="w-100 h-screen flex justify-center items-center">
      <form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
        <Box>
          <Box className="flex w-100 h-100">
            <Card className="py-10 px-10 mx-5 pb-10  rounded-sm">
              <CardContent>
                <Box className="text-center mb-6">
                  <Typography variant="h4">Login Administration</Typography>
                </Box>
                <Box className="flex items-center">
                  <Typography className="min-w-[120px]" noWrap>
                    Email:
                  </Typography>

                  <TextField
                    type="text"
                    name="email"
                    {...register('email')}
                    error={isError(errors.email)}
                    helperText={getTextError(errors.email)}
                  />
                </Box>
                <Box className="flex items-center mt-5">
                  <Typography className="min-w-[120px]" noWrap>
                    Password:
                  </Typography>
                  <TextField
                    type="password"
                    name="password"
                    {...register('password')}
                    error={isError(errors.password)}
                    helperText={getTextError(errors.password)}
                  />
                </Box>
              </CardContent>
              <Box className="w-100 flex justify-center mt-5">
                <Button className="text-white bg-main" fullWidth type="submit">
                  Sign In
                </Button>
              </Box>
            </Card>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AdminLogin;
