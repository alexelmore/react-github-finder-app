import { createContext, useReducer } from "react";
import alertReducer from "./AlertReducer";
// constant for the AlertContext context
const AlertContext = createContext();
export const AlertContextProvider = ({ children }) => {
  // Initial state object for the alert state
  const initialState = null;

  // Destructured constants for useReducers hook
  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Function that sets an alert
  const setAlert = (msg, type) => {
    dispatch({
      type: "SET_ALERT",
      payload: { msg, type },
    });
    setTimeout(() => {
      dispatch({ type: "REMOVE_ALERT" });
    }, 3000);
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
