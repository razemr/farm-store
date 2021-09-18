import { DISPATCH_ACTIONS as ACTIONS } from './ContextConstants';
import pluralize from 'pluralize';

const variable = (state, action) => {
  let resources = action.type.resource;
  let resource = resources ? pluralize.singular(resources) : '';

  switch (action.type.name) {
    case ACTIONS.list:
      state[resources] = action.payload[resources];
      return { ...state };
    default:
      return { ...state };
  }
};

export default variable;
