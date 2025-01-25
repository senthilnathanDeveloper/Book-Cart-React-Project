import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../app/components/features/userSlice'
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
