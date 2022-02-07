import { createContext, useReducer } from "react";
import githubReducer from "../GithubReducer";

// constant for the GithubContext context
const GithubContext = createContext();

export const GithubContextProvider = ({ children }) => {
  // Initial state object for the loading state and the user data
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  // Destructured constants for useReducers hook
  const [state, dispatch] = useReducer(githubReducer, initialState);

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
