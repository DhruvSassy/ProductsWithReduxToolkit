import {
  ADD_DATA,
  ADD_TO_CART,
  DELETE_DATA,
  DELETE_TO_ALL_CART_DATA,
  DELETE_TO_CART,
  EDIT_CART_DATA,
  EDIT_DATA,
  SET_TABLE_DATA,
} from '../action/constant';

const initialState = {
  list: [],
  cart: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA:
      return {
        ...state,
        list: [...state.list, action.payload],
      };

    case SET_TABLE_DATA:
      return {
        ...state,
        list: action.payload,
      };

    case EDIT_DATA:
      const updatedProduct = action.payload;
      const updatedProductList = state.list.map((product) => {
        if (product.id === updatedProduct.id) {
          return updatedProduct;
        }
        return product;
      });
      return {
        ...state,
        list: updatedProductList,
      };

    case DELETE_DATA:
      return {
        ...state,
        //list nam na array mathi product ni id sodhe ane array mathi kadhe
        list: state.list.filter((product) => product.id !== action.payload),
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.payload],
      };

      case EDIT_CART_DATA:
      return {
        ...state,
        cart: state.cart.map(product =>
          product.id === action.payload.id
            ? { ...product, count: action.payload.count }
            : product
        ),
      };
      case DELETE_TO_CART:
      return {
        ...state,
        cart: state.cart.filter((cart) => cart.id !== action.payload),
      };
      
      case DELETE_TO_ALL_CART_DATA:
      return{
        ...state,
        cart: [],
      };
      
    default:
      return state;
  }
};

export default productReducer;
