// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authslice'
import schoolReducer from "./slice/schoolSlice"
import teacherReducer from "./slice/teacherSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
      school: schoolReducer,
          teacher: teacherReducer,
  },
});