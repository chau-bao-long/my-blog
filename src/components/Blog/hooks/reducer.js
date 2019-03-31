import { SET_CATEGORY } from './constants';

const categoryReducer = (state, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        pickedId: action.payload,
      };
    default:
      return state;
  }
};

export default (state, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        categories: categoryReducer(state.categories, action),
      };
    default:
      return state;
  }
};
