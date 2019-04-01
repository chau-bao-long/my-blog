import React, { useReducer } from 'react';

import reducer from './reducer';
import actions from './actions';

export const BlogContext = React.createContext({ categories: {} });

const initialState = { categories: { pickedId: 0 } };

export const provideContext = WrappedComponent => props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BlogContext.Provider value={{ state, actions: actions(dispatch) }}>
      <WrappedComponent {...props} />
    </BlogContext.Provider>
  );
};
