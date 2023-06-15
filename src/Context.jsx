import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "./Reducer";
import actions from "./Actions";
import cartItems from "./data";
import { calculateCart } from "./utils";

const AppContext = createContext();

// const cart = new Map(cartItems.map((item) => [item.id, item]));
// const initialState = {
//   loading: false,
//   cart: cart,
// };

const initialState = {
  loading: false,
  cart: new Map(),
};

const url = "https://www.course-api.com/react-useReducer-cart-project";

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { totalAmount, totalPrice } = calculateCart(state.cart);

  const fetchCart = async () => {
    showLoader();
    try {
      const res = await fetch(url);
      const arr = await res.json();
      displayCart(arr);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

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

  const showLoader = () => {
    dispatch({ type: actions.LOADING });
  };

  const displayCart = (cart) => {
    dispatch({ type: actions.DISPLAY_ITEMS, payload: { cart } });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increase,
        decrease,
        totalAmount,
        totalPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
