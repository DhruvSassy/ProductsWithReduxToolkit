import { ADD_DATA, SET_ORDER, SET_ORDER_BY, SET_PAGE, SET_ROWS_PER_PAGE, SET_TABLE_DATA } from "./constant";

export const addproduct = (product) => ({
    type:ADD_DATA,
    payload:product,
}) ;

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