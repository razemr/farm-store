import { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';
import { DISPATCH_ACTIONS as ACTIONS } from './ContextConstants';
import { httpClient } from '../http/HttpClient';

const initialState = {
  crops: [],
  companies: [],
  farmers: [],
  products: [],
  productCategories: [],
  parishes: [],
  radaExtensions: [],
  units: [],
  programTemplates: [],
};

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    listItems(
      'crops',
      'farmers',
      'products',
      'parishes',
      'radaExtensions',
      'units',
      'programTemplates',
      'productCategories',
      'companies'
    );
  }, []);

  const listItems = async (...args) => {
    try {
      for (let i = 0; i < args.length; i++) {
        const result = await httpClient.get(args[i]);
        dispatch({
          type: {
            name: ACTIONS.list,
            resource: args[i],
          },
          payload: result.data,
        });
      }
    } catch (error) {
      //Toast error
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        crops: state.crops,
        companies: state.companies,
        farmers: state.farmers,
        products: state.products,
        productCategories: state.productCategories,
        parishes: state.parishes,
        radaExtensions: state.radaExtensions,
        units: state.units,
        programTemplates: state.programTemplates,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
