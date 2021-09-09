import { DISPATCH_ACTIONS as ACTIONS } from "./ContextConstants";

const variable = (state, action) => {
  switch (action.type) {
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
    case "postprograms":
      return {
        ...state,
        //programs: [action.payload.programs, ...state.programs],
      };
    case "listcrops":
      return {
        ...state,
        crops: action.payload.crops,
      };
    case "listproducts":
      return {
        ...state,
        products: action.payload.products,
      };
    case "listfarmers":
      return {
        ...state,
        farmers: action.payload.farmers,
      };
    case "listunits":
      return {
        ...state,
        units: action.payload.units,
      };
    case "listprogram-templates":
      return {
        ...state,
        programTemplates: action.payload.programTemplates,
      };
    case "listprograms":
      return {
        ...state,
        programs: action.payload.programs,
      };
    case "getprograms":
      return {
        ...state,
        program: action.payload.program,
      };
    default:
      return state;
  }
};

export default variable;
