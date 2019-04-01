import { useContext } from 'react';

import { BlogContext } from './blogProvider';

export default (stateKey = null, actionType = null) => {
  const { state, actions } = useContext(BlogContext);
  return [
    state && stateKey ? state[stateKey] : state,
    actions && actionType ? actions[actionType] : actions,
  ];
};
