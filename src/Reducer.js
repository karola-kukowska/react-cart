import actions from "./Actions";

actions;
const reducer = (state, action) => {
  if (action.type === actions.CLEAR_CART) {
    return { ...state, cart: new Map() };
  }
  if (action.type === actions.REMOVE) {
    const newCart = new Map(state.cart);
    newCart.delete(action.payload.id);
    return { ...state, cart: newCart };
  }
  if (action.type === actions.INCREASE) {
    const id = action.payload.id;
    const newCart = new Map(state.cart);
    const newItem = newCart.get(id);
    newCart.set(id, { ...newItem, amount: newItem.amount++ });
    return { ...state, cart: newCart };
  }
  if (action.type === actions.DECREASE) {
    const id = action.payload.id;
    const newCart = new Map(state.cart);
    const newItem = newCart.get(id);
    const newAmount = newItem.amount--;
    if (newAmount === 0) {
      newCart.delete(id);
    } else {
      newCart.set(id, { ...newItem, amount: newAmount });
    }
    return { ...state, cart: newCart };
  }
  throw new Error(`No matching action type: ${action.type}`);
};

export default reducer;
