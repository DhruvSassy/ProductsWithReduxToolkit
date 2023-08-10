import { ADD_DATA, ADD_TO_CART, DELETE_DATA, DELETE_TO_ALL_CART_DATA, DELETE_TO_CART, EDIT_CART_DATA, EDIT_DATA, SET_TABLE_DATA } from './constant';

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

export const addToCart = (cart) => ({
  type:ADD_TO_CART,
  payload:cart,
});

export const editCart = (id, count) => ({
  type: EDIT_CART_DATA,
  payload: { id, count },
});

export const deleteToCart = (id) => ({
  type:DELETE_TO_CART,
  payload:id,
});

export const deleteAllCart = () => ({
  type:DELETE_TO_ALL_CART_DATA,
  payload:[],
});

