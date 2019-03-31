import { SET_CATEGORY } from './constants';

const setCategory = cat => ({
  type: SET_CATEGORY,
  payload: cat,
});

export default dispatch => ({
  setCategory: cat => dispatch(setCategory(cat)),
});
