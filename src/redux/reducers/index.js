// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   rows: [], 
//   order: 'asc',
//   orderBy: '', 
//   page: 0,
//   rowsPerPage: 5,
// };

// export const tableSlice =(state = initialState , action) => {

// }
// // const tableSlice = createSlice({
// //   name: 'table',
// //   initialState,
// //   reducers: {
// //     setTableData(state, action) {
// //       state.rows = action.payload;
// //     },
// //     setOrder(state, action) {
// //       state.order = action.payload;
// //     },
// //     setOrderBy(state, action) {
// //       state.orderBy = action.payload;
// //     },
// //     setPage(state, action) {
// //       state.page = action.payload;
// //     },
// //     setRowsPerPage(state, action) {
// //       state.rowsPerPage = action.payload;
// //     },
// //   },
// // });

// export const {
//   setTableData,
//   setOrder,
//   setOrderBy,
//   setPage,
//   setRowsPerPage,
// } = tableSlice.actions;

// export default tableSlice.reducer;


const SET_TABLE_DATA = 'table/SET_TABLE_DATA';
const SET_ORDER = 'table/SET_ORDER';
const SET_ORDER_BY = 'table/SET_ORDER_BY';
const SET_PAGE = 'table/SET_PAGE';
const SET_ROWS_PER_PAGE = 'table/SET_ROWS_PER_PAGE';

const initialState = {
  rows: [],
  order: 'asc',
  orderBy: '',
  page: 0,
  rowsPerPage: 5,
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TABLE_DATA:
      return {
        ...state,
        rows: action.payload,
      };
    case SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case SET_ORDER_BY:
      return {
        ...state,
        orderBy: action.payload,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case SET_ROWS_PER_PAGE:
      return {
        ...state,
        rowsPerPage: action.payload,
      };
    default:
      return state;
  }
};

export const setTableData = (data) => ({
  type: SET_TABLE_DATA,
  payload: data,
});

export const setOrder = (order) => ({
  type: SET_ORDER,
  payload: order,
});

export const setOrderBy = (orderBy) => ({
  type: SET_ORDER_BY,
  payload: orderBy,
});

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});

export const setRowsPerPage = (rowsPerPage) => ({
  type: SET_ROWS_PER_PAGE,
  payload: rowsPerPage,
});

export default tableReducer;
