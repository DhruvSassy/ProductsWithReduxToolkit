
import { ADD_DATA, DELETE_DATA, EDIT_DATA, SET_TABLE_DATA } from "../action/constant";



const initialState = {
  list: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA:
    return{
        ...state,
        list:[...state.list,action.payload]
    }
    case SET_TABLE_DATA:
      return {
        ...state,
        list: action.payload,
      };
    case EDIT_DATA:
    const index = state.list.findIndex((product) => product.id === action.payload.id);
    if (index !== -1) {
      //navo array banve with edited product
      const updatedRows = [...state.list];
      updatedRows[index] = action.payload;
      return {
        ...state,
        list: updatedRows,
      };
    }
    // product nahi mde tyare current value aape
    return state;
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
