import { DISPATCH_ACTIONS as ACTIONS } from './ContextConstants';
import pluralize from 'pluralize';

const variable = (state, action) => {
  let resources = action.type.route;
  let resource = resources ? pluralize.singular(resources) : '';

  switch (action.type.name) {
    case ACTIONS.loading:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.doneLoading:
      return {
        ...state,
        loading: false,
      };
    case ACTIONS.single:
      state[resource] = action.payload[resource];
      return { ...state };
    case ACTIONS.multiple:
      state[resources] = action.payload[resources];
      return { ...state };
    default:
      return { ...state };
  }
};

export default variable;
