import { useContext } from 'react';

import { BlogContext } from './blogProvider';

export default (stateKey = null, actionType = null) => {
  const { state, actions } = useContext(BlogContext);
  return [
    stateKey ? state[stateKey] : state,
    actionType ? actions[actionType] : actions,
  ];
};
