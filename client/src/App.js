import {ThemeProvider} from '@emotion/react';
import {RouterProvider} from 'react-router';
import {Provider} from 'react-redux';
import store from './redux/store';
import './App.css';
import {router} from './routes';
import theme from './them';
import {StyledEngineProvider} from '@mui/material/styles';
import {ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
          <ToastContainer position="bottom-left" />
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
}

export default App;
