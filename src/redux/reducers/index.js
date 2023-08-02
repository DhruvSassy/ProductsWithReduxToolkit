import {
  ADD_DATA,
  DELETE_DATA,
  EDIT_DATA,
  SET_TABLE_DATA,
} from '../action/constant';

const initialState = {
  list: [],
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

    default:
      return state;
  }
};

export default productReducer;
