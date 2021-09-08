import { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";
import { DISPATCH_ACTIONS as ACTIONS } from "./ContextConstants";
import { httpClient } from "./HttpClient";

const initialState = {
  loading: false,
  programs: [],
  crops: [],
  companies: [],
  farmers: [],
  products: [],
  units: [],
  programTemplates: [],
  program: {},
};

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    httpClient.interceptors.request.use(
      function (config) {
        dispatch({
          type: ACTIONS.loading,
        });

        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    httpClient.interceptors.response.use(
      function (response) {
        dispatch({
          type: ACTIONS.doneLoading,
        });

        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }, []);

  const postItem = async (route, data) => {
    try {
      const result = await httpClient.post(route, data);
      dispatch({
        type: `post${route}`,
        payload: result.data,
      });
    } catch (error) {
      dispatchError(error);
    }
  };

  const listItems = (routes) => {
    try {
      [].concat(routes).forEach(async (route) => {
        const result = await httpClient.get(route);
        dispatch({
          type: `list${route}`,
          payload: result.data,
        });
      });
    } catch (error) {
      dispatchError(error);
    }
  };

  const getItem = async (route, id) => {
    try {
      const result = await httpClient.get(`${route}/${id}`);
      dispatch({
        type: `get${route}`,
        payload: result.data,
      });
    } catch (error) {
      dispatchError(error);
    }
  };

  const dispatchError = (error) => {
    dispatch({
      type: ACTIONS.error,
      payload: error,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        loading: state.loading,
        programs: state.programs,
        crops: state.crops,
        companies: state.companies,
        farmers: state.farmers,
        products: state.products,
        units: state.units,
        programTemplates: state.programTemplates,
        program: state.program,
        listItems,
        getItem,
        postItem,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
