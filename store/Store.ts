import { configureStore } from '@reduxjs/toolkit';
import navigationSlice from './reducer/Navigation';

const store = configureStore({
  reducer: {
    navigation: navigationSlice,
  },
});

export default store;
