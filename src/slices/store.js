import { configureStore } from '@reduxjs/toolkit';
import GuestReducer from './guest-slice';

const store = configureStore({
  reducer: {
    guest: GuestReducer
  }
});

export default store;
