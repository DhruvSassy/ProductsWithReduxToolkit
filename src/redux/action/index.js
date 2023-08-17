import axios from 'axios';
import {
  ADD_DATA,
  ADD_TO_CART,
  DELETE_DATA,
  DELETE_TO_ALL_CART_DATA,
  DELETE_TO_CART,
  EDIT_CART_DATA,
  EDIT_DATA,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  SET_TABLE_DATA,
} from './constant';

export const loginUser = (data) => {
  return (dispatch) => {
    return axios
      .post('https://fakestoreapi.com/auth/login', {
        username: data?.username,
        password: data?.password,
      })
      .then((response) => {
        if (response.status === 200) {
          const token = response.data.token;
          localStorage.setItem('token', token);
          const userData = {
            username: data.username,
            password: data.password,
            token: token,
          };
          dispatch({
            type: LOGIN_SUCCESS,
            payload: userData,
          });
          return response;
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILED,
          payload: err.response.data,
        });
        throw err;
      });
  };
};

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
  type: ADD_TO_CART,
  payload: cart,
});

export const editCart = (id, count) => ({
  type: EDIT_CART_DATA,
  payload: { id, count },
});

export const deleteToCart = (id) => ({
  type: DELETE_TO_CART,
  payload: id,
});

export const deleteAllCart = () => ({
  type: DELETE_TO_ALL_CART_DATA,
  payload: [],
});
