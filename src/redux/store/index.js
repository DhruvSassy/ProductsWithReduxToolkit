import { configureStore } from '@reduxjs/toolkit';
import tableReducer from '../reducers';

const store = configureStore({
  reducer: {
    table: tableReducer, 
  },
});

export default store;