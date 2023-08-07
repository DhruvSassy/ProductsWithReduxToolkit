import { ADD_DATA, ADD_TO_CART, DELETE_DATA, DELETE_TO_CART, EDIT_DATA, SET_TABLE_DATA } from './constant';

export const addProduct = (product) => ({
  type: ADD_DATA,
  payload: product,
});

export const setTableData = (data) => ({
  type: SET_TABLE_DATA,
  payload: data,
});

export const editProduct = (product) => ({
  type: EDIT_DATA,
  payload: product,
});

export const deleteProduct = (id) => ({
  type: DELETE_DATA,
  payload: id,
});

export const addToCart = (product) => ({
  type:ADD_TO_CART,
  payload:product,
});

export const deleteToCart = (id) => ({
  type:DELETE_TO_CART,
  payload:id,
});