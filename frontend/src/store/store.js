import { configureStore } from '@reduxjs/toolkit';
import groupSlice from './group.slice';

export const store = configureStore({
  reducer: {
    groups: groupSlice,
  },
});