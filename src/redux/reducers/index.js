
import { ADD_DATA, DELETE_DATA, EDIT_DATA, SET_TABLE_DATA } from "../action/constant";



const initialState = {
  rows: [],
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA:
    return{
        ...state,
        rows:[...state.rows,action.payload]
    }
    case SET_TABLE_DATA:
      return {
        ...state,
        rows: action.payload,
      };
    case EDIT_DATA:
    const index = state.rows.findIndex((product) => product.id === action.payload.id);
    if (index !== -1) {
      //navo array banve with edited product
      const updatedRows = [...state.rows];
      updatedRows[index] = action.payload;
      return {
        ...state,
        rows: updatedRows,
      };
    }
    // product nahi mde tyare current value aape
    return state;
    case DELETE_DATA:
    return {
      ...state,
      //rows nam na array mathi product ni id sodhe ane array mathi kadhe 
      rows: state.rows.filter((product) => product.id !== action.payload),
    };
  
    default:
      return state;
  }
};



export default tableReducer;
