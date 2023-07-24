
import { ADD_DATA, SET_ORDER, SET_ORDER_BY, SET_PAGE, SET_ROWS_PER_PAGE, SET_TABLE_DATA } from "../action/constant";



const initialState = {
  rows: [],
  order: 'asc',
  orderBy: '',
  page: 0,
  rowsPerPage: 10,
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



export default tableReducer;
