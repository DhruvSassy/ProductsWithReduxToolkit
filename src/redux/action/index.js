import { ADD_DATA, DELETE_DATA, EDIT_DATA, SET_TABLE_DATA } from "./constant";

export const addProduct = (product) => ({
    type:ADD_DATA,
    payload:product,
}) ;

export const setTableData = (data) => ({
  type: SET_TABLE_DATA,
  payload: data,
});

export const editProduct = (product) => ({
  type:EDIT_DATA,
  payload:product,
});

export const deleteProduct = (id) => ({
  type: DELETE_DATA,
  payload:id
});

