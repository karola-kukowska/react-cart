import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "./Reducer";
import actions from "./Actions";
import cartItems from "./data";

const AppContext = createContext();

const cart = new Map(cartItems.map((item) => [item.id, item]));
const initialState = {
  loading: false,
  cart: cart,
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({ type: actions.CLEAR_CART });
  };

  const removeItem = (id) => {
    dispatch({ type: actions.REMOVE, payload: { id } });
  };

  const increase = (id) => {
    dispatch({ type: actions.INCREASE, payload: { id } });
  };

  const decrease = (id) => {
    dispatch({ type: actions.DECREASE, payload: { id } });
  };

  return (
    <AppContext.Provider
      value={{ ...state, clearCart, removeItem, increase, decrease }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
