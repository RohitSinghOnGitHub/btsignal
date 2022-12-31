import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import packageReducer from './slices/packageSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    packages: packageReducer,
  },
});
